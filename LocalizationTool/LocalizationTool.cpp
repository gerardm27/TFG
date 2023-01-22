#include <iostream>
#include <string>
#include <fstream>
#include <cstring> 
#include <vector>

using namespace std;

void Usage() {
    cout << "Usage: ./LocalizationTool relativePathCSVFile [outputRelativePath]" << endl;
}

struct LanguageFile {
    string outputPath = "";
    string language = "";
    string content = "";
};

vector<string> Split(string input, char separator) {
    vector<string> output;
    string temp = "";
    bool isInQuote = false;
    for(int i = 0; i < input.size(); ++i) {
        if(input[i] == '"') {
            isInQuote = !isInQuote;
        }
        else {
            if((input[i] == separator || input[i] == '\n' || input[i] == '\0' || input[i] == '\r') && !isInQuote) {
                output.push_back(temp);
                temp = "";
            }
            else {
                temp += input[i];
            }
        }
    }
    if(temp != "") {
        output.push_back(temp);
    }

    return output;
}

bool ReadInput(string fileName, string outputPath, vector<LanguageFile>& jsonElements) {

    ifstream csvFile (fileName);

    if (csvFile.is_open()) {
        string currentLine = "";
        int currentLineCounter = 0;
        vector<bool> objectCreated;
        vector<bool>inSubobject;
        while ( getline (csvFile,currentLine) )
        {
            vector<string> lineSplitted = Split(currentLine, ',');
            if(currentLineCounter == 0) {
                for(int i = 1; i < lineSplitted.size(); ++i) {
                    LanguageFile lf;
                    objectCreated.push_back(false);
                    inSubobject.push_back(false);
                    lf.outputPath = outputPath + "/" + lineSplitted[i] + ".js";
                    lf.language = lineSplitted[i];
                    lf.content = "const " + lineSplitted[i] + " = {";
                    jsonElements.push_back(lf);
                }
            }
            else {
                for(int i = 0; i < jsonElements.size(); ++i) {
                    if(lineSplitted[0].size() == 0) continue;
                    jsonElements[i].content += "\n";
                    if(lineSplitted[0].find("PAGE_") != -1) {
                        if(inSubobject[i]) {
                            jsonElements[i].content += "\t\t}, \n";
                            inSubobject[i] = false;
                        }
                        if(objectCreated[i]) {
                            jsonElements[i].content += "\t}, \n";
                        }
                        jsonElements[i].content += "\t" + Split(lineSplitted[0],'_')[1] + ": {";
                        objectCreated[i] = true;
                    }
                    else if(lineSplitted[0].find("_") != -1) {
                        vector<string> subtitle = Split(lineSplitted[0],'_');
                        if(!inSubobject[i]) {
                            jsonElements[i].content += "\t\t" + subtitle[0] + ": {\n";
                        }
                        jsonElements[i].content += "\t\t\t" + subtitle[1] + ": \"" + lineSplitted[i+1] + "\",";
                        inSubobject[i] = true;
                    }
                    else {
                        if(inSubobject[i]) {
                            jsonElements[i].content += "\t\t}, \n";
                            inSubobject[i] = false;
                        }
                        jsonElements[i].content += "\t\t" + lineSplitted[0] + ": \"" + lineSplitted[i+1] + "\",";
                    }
                }
                
            }
            currentLineCounter++;
        }
        for(int i = 0; i < jsonElements.size(); ++i) {
             if(inSubobject[i]) {
                jsonElements[i].content += "\n\t\t}";
                inSubobject[i] = false;
            }
            if(objectCreated[i]) {
                jsonElements[i].content += "\n\t}";
            }
            jsonElements[i].content += "\n}\nexport{ " + jsonElements[i].language + " }";
            
        }

        csvFile.close();
        return true;
    }
    else {
        return false;
    }
}

bool WriteOutput(string jsonElement, string outputPath) {
    ofstream myfile;
    myfile.open (outputPath);
    myfile << jsonElement;
    myfile.close();
    return true;
}

bool WriteIndex(vector<LanguageFile>& jsonElements, string outputPath) {
    ofstream myfile;
    myfile.open (outputPath);
    for(int i = 0; i < jsonElements.size(); ++i) {
        myfile << "export * from \'./" << jsonElements[i].language + "\';\n";
    }
    myfile.close();

    return true;
}

bool ProcessFile(string fileName, string outputPath) {
    vector<LanguageFile> jsonElements;
    if(outputPath[outputPath.size() - 1] == '/') {
        outputPath.erase(outputPath.size() - 1);
    }
    bool result = ReadInput(fileName, outputPath, jsonElements);
    if(result) {
        for(int i = 0; i < jsonElements.size(); ++i) {
            cout << "Writing " << jsonElements[i].outputPath << endl;
            WriteOutput(jsonElements[i].content, jsonElements[i].outputPath);
        }
        WriteIndex(jsonElements, outputPath + "/index.js");
    }
    return result;
}

int main(int argc, char* argv[]) {
    string outputPath = "../src/i18n";
    if(argc < 2) {
        Usage();
        return 1;
    }
    else if(argc == 2) {
        outputPath = argv[1];
    } 
    else if(argc == 3) {
        outputPath = argv[2];
    }
    if(ProcessFile(argv[1], outputPath)) {
        cout << "Localización completada" << endl;
    }
    else {
        cout << "Archivo " << argv[1] << " no encontrado." << endl;
    }

    return 0;
}
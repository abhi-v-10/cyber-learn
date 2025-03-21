import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Unlock, ArrowDownUp, Info, Copy } from "lucide-react";
import { toast } from "sonner";

export const EncryptionPlayground = () => {
  const [encryptionType, setEncryptionType] = useState("caesar");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("3");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard");
  };

  const handleSwapMode = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    // Swap input and output
    setInputText(outputText);
    setOutputText(inputText);
  };

  const processText = () => {
    if (!inputText) {
      toast.error("Please enter some text first");
      return;
    }

    let result = "";

    switch (encryptionType) {
      case "caesar":
        result = caesarCipher(inputText, parseInt(key) || 0);
        break;
      case "vigenere":
        result = vigenereCipher(inputText, key);
        break;
      case "base64":
        result = base64Process(inputText);
        break;
      case "rot13":
        result = rot13(inputText);
        break;
      case "reverse":
        result = reverse(inputText);
        break;
      case "morse":
        result = morseCodeProcess(inputText);
        break;
      default:
        result = "Unsupported encryption type";
    }

    setOutputText(result);
  };

  // Caesar Cipher implementation
  const caesarCipher = (text: string, shift: number) => {
    if (mode === "decrypt") {
      shift = -shift;
    }

    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        }
        // Handle lowercase letters
        else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        }
        // Leave non-alphabetic characters unchanged
        return char;
      })
      .join("");
  };

  // Vigenere Cipher implementation
  const vigenereCipher = (text: string, keyword: string) => {
    if (!keyword.trim()) {
      toast.error("Vigenere cipher requires a keyword");
      return text;
    }

    // Filter the keyword to only include letters
    const filteredKeyword = keyword
      .toUpperCase()
      .split("")
      .filter((char) => /[A-Z]/.test(char))
      .join("");

    if (filteredKeyword.length === 0) {
      toast.error("Vigenere cipher requires a keyword with letters");
      return text;
    }

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const code = char.charCodeAt(0);

      // Handle alphabetic characters
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        const isUpperCase = code >= 65 && code <= 90;
        const baseCharCode = isUpperCase ? 65 : 97;
        const textCharValue = code - baseCharCode;

        // Get the current key character and its value (0-25)
        const keyChar = filteredKeyword[keyIndex % filteredKeyword.length];
        const keyValue = keyChar.charCodeAt(0) - 65;

        // Apply encryption or decryption
        let resultValue;
        if (mode === "encrypt") {
          resultValue = (textCharValue + keyValue) % 26;
        } else {
          resultValue = (textCharValue - keyValue + 26) % 26;
        }

        result += String.fromCharCode(resultValue + baseCharCode);
        keyIndex++;
      } else {
        // Leave non-alphabetic characters unchanged
        result += char;
      }
    }

    return result;
  };

  // Base64 encoding/decoding
  const base64Process = (text: string) => {
    try {
      if (mode === "encrypt") {
        return btoa(text);
      } else {
        return atob(text);
      }
    } catch (e) {
      toast.error("Invalid Base64 string for decoding");
      return text;
    }
  };

  // ROT13 cipher
  const rot13 = (text: string) => {
    // ROT13 is its own inverse, so encrypt and decrypt are the same
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + 13) % 26) + 65);
        }
        // Handle lowercase letters
        else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + 13) % 26) + 97);
        }
        // Leave non-alphabetic characters unchanged
        return char;
      })
      .join("");
  };

  // Simple string reversal
  const reverse = (text: string) => {
    return text.split("").reverse().join("");
  };

  // Morse code conversion
  const morseCodeProcess = (text: string) => {
    const morseCodeMap: { [key: string]: string } = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
      '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', 
      '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', 
      ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', 
      '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
    };

    // Inverse map for decoding
    const inverseMorseCodeMap: { [key: string]: string } = {};
    Object.keys(morseCodeMap).forEach(key => {
      inverseMorseCodeMap[morseCodeMap[key]] = key;
    });

    if (mode === "encrypt") {
      return text
        .toUpperCase()
        .split("")
        .map(char => {
          if (char === ' ') return '  '; // Double space for word separation
          return morseCodeMap[char] || char;
        })
        .join(' ');
    } else {
      return text
        .split('  ') // Split by double space (word separator)
        .map(word => 
          word
            .split(' ') // Split by single space (character separator)
            .map(morseChar => inverseMorseCodeMap[morseChar] || morseChar)
            .join('')
        )
        .join(' ');
    }
  };

  const renderKeyInput = () => {
    switch (encryptionType) {
      case "caesar":
        return (
          <div className="space-y-2">
            <label htmlFor="key" className="block text-sm font-medium">
              Shift Value (1-25)
            </label>
            <Input
              id="key"
              type="number"
              min="1"
              max="25"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter shift value (e.g., 3)"
            />
          </div>
        );
      case "vigenere":
        return (
          <div className="space-y-2">
            <label htmlFor="key" className="block text-sm font-medium">
              Keyword
            </label>
            <Input
              id="key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter keyword (e.g., KEY)"
            />
          </div>
        );
      case "base64":
      case "rot13":
      case "reverse":
      case "morse":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Encryption Playground</h2>
        <p className="text-muted-foreground mt-2">
          Experiment with various encryption techniques and learn how they work.
        </p>
      </div>

      <Tabs defaultValue="encrypt" value={mode} onValueChange={(v) => setMode(v as "encrypt" | "decrypt")}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="icon" onClick={handleSwapMode} title="Swap encryption/decryption">
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "encrypt" ? (
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Encrypt Message</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Unlock className="h-5 w-5" />
                <span>Decrypt Message</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="encryptionType" className="block text-sm font-medium">
              Encryption Method
            </label>
            <Select
              value={encryptionType}
              onValueChange={setEncryptionType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select encryption method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="caesar">Caesar Cipher</SelectItem>
                <SelectItem value="vigenere">Vigenère Cipher</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
                <SelectItem value="rot13">ROT13</SelectItem>
                <SelectItem value="reverse">Reverse Text</SelectItem>
                <SelectItem value="morse">Morse Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderKeyInput()}

          <div className="space-y-2">
            <label htmlFor="inputText" className="block text-sm font-medium">
              {mode === "encrypt" ? "Plain Text" : "Cipher Text"}
            </label>
            <Textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encrypt"
                  ? "Enter text to encrypt..."
                  : "Enter text to decrypt..."
              }
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={processText} className="w-full">
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </Button>

          {outputText && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="outputText" className="block text-sm font-medium">
                  {mode === "encrypt" ? "Cipher Text" : "Plain Text"}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                {outputText}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <span>About {getEncryptionMethodName(encryptionType)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {getEncryptionMethodDescription(encryptionType)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function getEncryptionMethodName(type: string): string {
  switch (type) {
    case "caesar":
      return "Caesar Cipher";
    case "vigenere":
      return "Vigenère Cipher";
    case "base64":
      return "Base64 Encoding";
    case "rot13":
      return "ROT13 Cipher";
    case "reverse":
      return "Text Reversal";
    case "morse":
      return "Morse Code";
    default:
      return "Encryption Method";
  }
}

function getEncryptionMethodDescription(type: string): JSX.Element {
  switch (type) {
    case "caesar":
      return (
        <div>
          <p>
            The Caesar Cipher is one of the earliest and simplest encryption techniques.
            It works by shifting each letter in the plaintext a certain number of
            positions down the alphabet.
          </p>
          <p className="mt-2">
            <strong>Example:</strong> With a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on.
          </p>
          <p className="mt-2">
            <strong>Historical significance:</strong> Named after Julius Caesar, who reportedly
            used it with a shift of 3 to protect messages of military significance.
          </p>
        </div>
      );
    case "vigenere":
      return (
        <div>
          <p>
            The Vigenère cipher is a method of encrypting alphabetic text by using a
            simple form of polyalphabetic substitution. It uses a keyword to determine
            different shift values for different positions in the text.
          </p>
          <p className="mt-2">
            <strong>Example:</strong> With the keyword "KEY", 'K' shifts by 10, 'E' by 4, and 'Y' by 24,
            then repeats for the entire message.
          </p>
          <p className="mt-2">
            <strong>Security:</strong> More secure than simple substitution ciphers but
            still vulnerable to frequency analysis when the keyword is short.
          </p>
        </div>
      );
    case "base64":
      return (
        <div>
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data in
            an ASCII string format. It's commonly used when there's a need to encode
            binary data that needs to be stored and transferred over media that are
            designed to deal with text.
          </p>
          <p className="mt-2">
            <strong>Uses:</strong> Email attachments, embedding image data in HTML or CSS, storing complex
            data in XML or JSON.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> Base64 is not an encryption method; it's an encoding scheme. It doesn't provide security,
            just a way to represent binary data in ASCII characters.
          </p>
        </div>
      );
    case "rot13":
      return (
        <div>
          <p>
            ROT13 (rotate by 13 places) is a simple letter substitution cipher that
            replaces a letter with the 13th letter after it in the alphabet. It's a
            special case of the Caesar cipher.
          </p>
          <p className="mt-2">
            <strong>Unique property:</strong> ROT13 is its own inverse; applying ROT13 twice returns the original text.
          </p>
          <p className="mt-2">
            <strong>Use cases:</strong> Historically used in online forums to hide spoilers, jokes, or
            puzzle solutions from casual viewing.
          </p>
        </div>
      );
    case "reverse":
      return (
        <div>
          <p>
            Text reversal is a very simple transformation where the characters of a
            text are reversed from end to beginning. While not a cryptographic method,
            it can be a basic way to obscure text.
          </p>
          <p className="mt-2">
            <strong>Example:</strong> "Hello World" becomes "dlroW olleH".
          </p>
          <p className="mt-2">
            <strong>Note:</strong> This is extremely easy to detect and reverse, providing essentially
            no security.
          </p>
        </div>
      );
    case "morse":
      return (
        <div>
          <p>
            Morse code is a method used in telecommunication to encode text characters
            as standardized sequences of two different signal durations, called dots
            and dashes.
          </p>
          <p className="mt-2">
            <strong>History:</strong> Developed by Samuel Morse and Alfred Vail in the 1830s and 1840s
            for use with the telegraph.
          </p>
          <p className="mt-2">
            <strong>Format:</strong> Each letter or numeral is represented by a unique sequence of dots
            and dashes. Spaces are used to separate characters and words.
          </p>
          <p className="mt-2">
            <strong>Example:</strong> "SOS" is represented as "... --- ...".
          </p>
        </div>
      );
    default:
      return <p>Select an encryption method to learn more about it.</p>;
  }
}

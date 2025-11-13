import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextEncryptor: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [method, setMethod] = useState('caesar');

  const encryptionMethods = [
    {
      id: 'caesar',
      name: 'Caesar Cipher',
      description: 'Shift each letter by a fixed number of positions',
      encrypt: (text: string, key: string) => {
        const shift = parseInt(key) || 3;
        return text.replace(/[a-zA-Z]/g, (char) => {
          const start = char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
        });
      },
      decrypt: (text: string, key: string) => {
        const shift = parseInt(key) || 3;
        return text.replace(/[a-zA-Z]/g, (char) => {
          const start = char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
        });
      }
    },
    {
      id: 'atbash',
      name: 'Atbash Cipher',
      description: 'Replace each letter with its mirror in the alphabet',
      encrypt: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          if (char <= 'Z') {
            return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
          } else {
            return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
          }
        });
      },
      decrypt: (text: string) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
          if (char <= 'Z') {
            return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
          } else {
            return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
          }
        });
      }
    },
    {
      id: 'reverse',
      name: 'Reverse Cipher',
      description: 'Simply reverse the text',
      encrypt: (text: string) => text.split('').reverse().join(''),
      decrypt: (text: string) => text.split('').reverse().join('')
    },
    {
      id: 'base64',
      name: 'Base64 Encoding',
      description: 'Encode text using Base64',
      encrypt: (text: string) => btoa(text),
      decrypt: (text: string) => {
        try {
          return atob(text);
        } catch {
          return 'Invalid Base64';
        }
      }
    }
  ];

  const selectedMethod = encryptionMethods.find(m => m.id === method);

  const getEncrypted = () => {
    if (!text || !selectedMethod) return '';
    return selectedMethod.encrypt(text, key);
  };

  const getDecrypted = () => {
    if (!text || !selectedMethod) return '';
    return selectedMethod.decrypt(text, key);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setKey('');
  };

  const encrypted = getEncrypted();
  const decrypted = getDecrypted();

  return (
    <Layout title="Text Encryptor" showBackButton>
      <div className="space-y-6">
        {/* Method Selection */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Encryption Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {encryptionMethods.map((methodOption) => (
              <label key={methodOption.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value={methodOption.id}
                  checked={method === methodOption.id}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mt-1 text-cyan-500"
                />
                <div>
                  <div className="text-white font-medium">{methodOption.name}</div>
                  <div className="text-white/60 text-sm">{methodOption.description}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Key Input for Caesar Cipher */}
          {method === 'caesar' && (
            <div className="mt-4">
              <label className="block text-white/70 text-sm font-medium mb-2">
                Shift Amount (Key)
              </label>
              <input
                type="number"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="3"
                min="1"
                max="25"
                className="w-32 p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Original Text */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to encrypt..."
              className="w-full h-48 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Encrypted Text */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Encrypted</h3>
              <button
                onClick={() => copyToClipboard(encrypted)}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-48 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {encrypted || 'Encrypted text will appear here...'}
              </pre>
            </div>
          </div>

          {/* Decrypted Text */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Decrypted</h3>
              <button
                onClick={() => copyToClipboard(decrypted)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-48 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {decrypted || 'Decrypted text will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Encryption Methods</h3>
          <div className="space-y-3 text-sm">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
              <div className="text-white font-medium">Caesar Cipher</div>
              <div className="text-white/70">Shifts each letter by a fixed number. Example: A→D with shift 3</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
              <div className="text-white font-medium">Atbash Cipher</div>
              <div className="text-white/70">Replaces A→Z, B→Y, C→X, etc. Self-reversing cipher</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
              <div className="text-white font-medium">Reverse Cipher</div>
              <div className="text-white/70">Simply reverses the text character by character</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
              <div className="text-white font-medium">Base64 Encoding</div>
              <div className="text-white/70">Encodes text using Base64 format (not encryption, just encoding)</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextEncryptor;
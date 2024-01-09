import React, {useRef, useState} from 'react';
import { Button } from 'antd';
import {Editor} from "@monaco-editor/react";

const TestPage: React.FC = () => {

  const editorRef = useRef(null);

  const handleTest = () => {
    const content = `
      String a = "123";

    `;
    //@ts-ignore
    editorRef.current?.setValue(content);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    //@ts-ignore
    monaco.languages.registerCompletionItemProvider('javascript', {
       triggerCharacters: ['$'],
       provideCompletionItems: function(model, position) {
            return {
                suggestions: [
                  {
                    label: '$jdbc.queryForList',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: '$jdbc.queryForList({sql},{params})',
                    }
                ]
            };
       }

    });
  }

  return (
    <div>
      <Button onClick={handleTest}>Test</Button>

      <Editor
        height="30vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        onMount={handleEditorDidMount}
      />


    </div>
  );
};

export default TestPage;

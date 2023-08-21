import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';

export default function AtomEditor({ initValue = '', onChange }) {
  const editorRef = useRef(null);

  return (
    <EditUserWrapper>
      {/* <h1>test</h1> */}
      <Editor
        apiKey="er3esf1jqgtskimmpszcfxf0zm84j1co1sfw2gleerhsleth"
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initValue}
        init={{
          height: '700px',
          menubar: false,
          resize: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
            'textcolor'
          ],
          toolbar:
            'undo redo | outdent indent |' +
            'blocks |' +
            'forecolor backcolor | ' +
            'bold italic underline strikethrough ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'numlist bullist | ' +
            'link image media | ' +
            'blockquote subscript superscript | ' +
            'removeformat | help',
          content_style: ''
        }}
        onEditorChange={onChange}
      />
    </EditUserWrapper>
  );
}

const EditUserWrapper = styled.div`
  /* position: absolute; */
  width: 100%;
  margin: 10px 0px;
`;

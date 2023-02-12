import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';
import { useState, useEffect, useCallback } from 'react'
import '@aws-amplify/ui-react/styles.css';


import {
  HorizontalPageSplit,
  VerticalPageSplit
} from 'react-page-split';
import 'react-page-split/style.css';



interface Data {
  output: Html | Error,
}

interface Html {
  html: string
}

interface Error {
  component: string
  error: any
}



function Home() {


  const handleClick = async () => {

    console.log(typeof(jsonInput));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mjml: input, params:
          JSON.parse(jsonInput)
      })
    };
    try {
      const data = await (await fetch('/api/hello', requestOptions)).json()
      setHtml(data.output.html)
    } catch (err) {
      console.log(err)
    }
  }

  const [input, setInput] = useState(`<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
      {{#each people}}
      <mj-text font-size="20px" color="#F45E43">{{this}}</mj-text>
    {{/each}}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`)

const [jsonInput, setJsonInput] = useState('{ "people": ["a", "b"] }')

  const [html, setHtml] = useState(`
<p>None</p>
`);


  const onChange = useCallback((value:string, viewUpdate:any) => {
    setInput(value);
  }, []);

  const onChangeJson = useCallback((value:string, viewUpdate:any) => {
    setJsonInput(value);
  }, []);

  return (

    <HorizontalPageSplit widths={['50%', '50%']}>
            <VerticalPageSplit>
            <CodeMirror
            onChange={onChange}
            value={input}
            extensions={[xml()]}
          />

          <CodeMirror
            onChange={onChangeJson}
            value={jsonInput}
            extensions={[json()]}
          />
          <button onClick={handleClick}>Preview</button>
            </VerticalPageSplit>
            <VerticalPageSplit heights={['50%', '50%']}>
            <div dangerouslySetInnerHTML={{ __html: html }} />

            </VerticalPageSplit>
        </HorizontalPageSplit>
  );
}
export default Home;
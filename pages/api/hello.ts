// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mjml2html  from 'mjml'
import type {MJMLParseResults} from 'mjml-core'



interface Data {
  output: MJMLParseResults | undefined | Error,
}

interface Error {
  component: string
  error: any
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    let templatedMjml= '';
  const Handlebars = require("handlebars");
  try {
    const template = Handlebars.compile(req.body.mjml);
    templatedMjml = template(req.body.params);

  } catch (error) {
    res.status(400).json({output: { component: "handlesbar" ,"error" :error }})
  }

  let mjmlResponse;
  try {
    mjmlResponse = mjml2html(templatedMjml, { validationLevel: 'strict' })
  } catch (error) {
    res.status(400).json({output: { component: "mjmml" ,"error" :error}})
  }

    res.status(200).json({output: mjmlResponse})
  } else {
    res.status(501);
  }

}

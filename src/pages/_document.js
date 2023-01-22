import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document{
  static getInitialProps(ctx){
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage 

    try{
      ctx.renderPage = () => originalRenderPage ({
        enhanceApp : (App) => (props) => 
          sheet.collectStyles(<App {...props}/>)
      })
      const initialProps =  Document.getInitialProps(ctx)
      return{
        ...initialProps,
        style:(
          <>
            {initialProps.styles}
            {sheet.getStyleElement}
          </>
        ),
      }
    }
    finally{
      sheet.seal()
    }
  
  }
}
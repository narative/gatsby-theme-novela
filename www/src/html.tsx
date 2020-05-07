import React from 'react';

export default (props) => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <script
        dangerouslySetInnerHTML={{ __html: `document.domain = "pil0t.app"` }}
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
);

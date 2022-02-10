import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';

/**
 * Создает XADES-BES подпись для документа в формате XML
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @returns подпись
 */

export const createXadesXPathFilter2Signature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string, xsltSchemaMessage: string): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    const sContent = `
<a>
    <b>Text 1</b>
    <b>Text 2</b>
    <c>Comment</c>
    <ds:Signature xmlns:dsig-xpath="http://www.w3.org/2002/06/xmldsig-filter2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="base64-content-signature">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>
            <ds:Reference URI="">
                <ds:Transforms>
                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                    <ds:Transform Algorithm="http://www.w3.org/2002/06/xmldsig-filter2">
                        <dsig-xpath:XPath Filter="subtract"> //b </dsig-xpath:XPath>
                    </ds:Transform>
                </ds:Transforms>
                <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>
                <ds:DigestValue/>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue/>
        <ds:KeyInfo/>
    </ds:Signature>
</a>`;

    console.log('wow2');
    //     const sContent = `<?xml version="1.0" encoding="UTF-8"?>
    // <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    //     <s:Body>
    //         <Document xml:id="base64-content">
    //             dse
    //         </Document>
    //     </s:Body>
    //     <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="base64-content-signature">
    //         <ds:SignedInfo>
    //             <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
    //             <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>
    //             <ds:Reference URI="#base64-content">
    //                 <ds:Transforms>
    //                     <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
    //                      <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xslt-19991116">
    //                         <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    //                             <xsl:output method="text"/>
    //                             <xsl:template match="/">
    //                                 <wow/>
    //                             </xsl:template>
    //                         </xsl:stylesheet>
    //                     </ds:Transform>
    //                 </ds:Transforms>
    //                 <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>
    //                 <ds:DigestValue/>
    //             </ds:Reference>
    //         </ds:SignedInfo>
    //         <ds:SignatureValue/>
    //         <ds:KeyInfo/>
    //     </ds:Signature>
    // </s:Envelope>`;

    // unencryptedMessage = decodeURIComponent(
    //   atob(unencryptedMessage)
    //     .split('')
    //     .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    //     .join(''),
    // );
    //
    // xsltSchemaMessage = decodeURIComponent(
    //   atob(xsltSchemaMessage)
    //     .split('')
    //     .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    //     .join(''),
    // );
    //
    // const signatureTemplate = `<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="xslt-transformed-xml-signature">
    //     <ds:SignedInfo>
    //         <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
    //         <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>
    //             <ds:Reference URI="">
    //             <ds:Transforms>
    //                 <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xslt-19991116">
    //                     ${xsltSchemaMessage}
    //                 </ds:Transform>
    //                 <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
    //             </ds:Transforms>
    //             <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>
    //             <ds:DigestValue/>
    //             </ds:Reference>
    //     </ds:SignedInfo>
    //     <ds:SignatureValue/>
    //     <ds:KeyInfo/>
    // </ds:Signature>`;
    //
    // const parsedXml = new DOMParser().parseFromString(unencryptedMessage, 'text/xml');
    // parsedXml.documentElement.append(signatureTemplate);
    //
    // const rootClosingElementIndex = unencryptedMessage.lastIndexOf(`</${parsedXml.documentElement.nodeName}>`);
    //
    // console.log(unencryptedMessage);
    // console.log(parsedXml.documentElement.nodeName);
    // console.log(rootClosingElementIndex);
    //
    // const templateXml = new XMLSerializer().serializeToString(parsedXml)
    //   .replace(/&lt;/g, '<')
    //   .replace(/&gt;/g, '>');
    //
    // console.log(templateXml);

    return eval(
      _generateCadesFn(function createXMLSignature(): string {
        let cadesSigner;
        let cadesSignedXML;

        try {
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        try {
          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          void (__cadesAsyncToken__ + cadesSigner.propset_CheckCertificate(false));
          void (
            __cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)
          );
          void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(sContent));
          void (
            __cadesAsyncToken__ +
            cadesSignedXML.propset_SignatureType(
              cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE | cadesplugin.CADESCOM_XADES_BES,
            )
          );
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature = __cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
          console.log(signature);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        // const r = '<?xml version="1.0"?>\n' +
        //   '<a>\n' +
        //   '    <b>Text 121</b>\n' +
        //   '    <b>Text 212</b>\n' +
        //   '    <c>Comment</c>\n' +
        //   '    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:dsig-xpath="http://www.w3.org/2002/06/xmldsig-filter2" Id="base64-content-signature">\n' +
        //   '        <ds:SignedInfo>\n' +
        //   '            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>\n' +
        //   '            <ds:SignatureMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256"/>\n' +
        //   '            <ds:Reference URI="">\n' +
        //   '                <ds:Transforms>\n' +
        //   '                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>\n' +
        //   '                    <ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>\n' +
        //   '                    <ds:Transform Algorithm="http://www.w3.org/2002/06/xmldsig-filter2">\n' +
        //   '                        <dsig-xpath:XPath Filter="subtract"> //b </dsig-xpath:XPath>\n' +
        //   '                    </ds:Transform>\n' +
        //   '<!--                    <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xslt-19991116">-->\n' +
        //   '<!--                         <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">-->\n' +
        //   '<!--                            <xsl:output method="text"/>-->\n' +
        //   '<!--                            <xsl:template match="/">-->\n' +
        //   '<!--                                <foo/>-->\n' +
        //   '<!--                            </xsl:template>-->\n' +
        //   '<!--                         </xsl:stylesheet>-->\n' +
        //   '<!--                     </ds:Transform>-->\n' +
        //   '                </ds:Transforms>\n' +
        //   '                <ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>\n' +
        //   '                <ds:DigestValue>T1t2mlx3jmV+XTMAQvcowRdGTcOkCmc7NDt9TtJVb8o=</ds:DigestValue>\n' +
        //   '            </ds:Reference>\n' +
        //   '        <ds:Reference Type="http://uri.etsi.org/01903#SignedProperties" URI="#SignedPropertiesReferenceId1-51e4b1465-7ee7-584a-19bf-e317e6cb2ae">\n' +
        //   '<ds:DigestMethod Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>\n' +
        //   '<ds:DigestValue>2b5L74qLKWU/NcBUmc1oClb53LgvCPMN6sOSPozr7pI=</ds:DigestValue>\n' +
        //   '</ds:Reference>\n' +
        //   '</ds:SignedInfo>\n' +
        //   '        <ds:SignatureValue>9SNppNtxX26tP0VezuuGjU/yCkdk9UG4EIZHMlzyMufE7+HtF1zFfwScNx05YPku\n' +
        //   '/3WILIvmB2Vvm3abxxSb7Q==</ds:SignatureValue>\n' +
        //   '        <ds:KeyInfo>\n' +
        //   '<ds:X509Data>\n' +
        //   '<ds:X509Certificate>MIIFDjCCBLugAwIBAgITfAAEcTbiAHou7fXHlwABAARxNjAKBggqhQMHAQEDAjCC\n' +
        //   'AQoxGDAWBgUqhQNkARINMTIzNDU2Nzg5MDEyMzEaMBgGCCqFAwOBAwEBEgwwMDEy\n' +
        //   'MzQ1Njc4OTAxLzAtBgNVBAkMJtGD0LsuINCh0YPRidGR0LLRgdC60LjQuSDQstCw\n' +
        //   '0Lsg0LQuIDE4MQswCQYDVQQGEwJSVTEZMBcGA1UECAwQ0LMuINCc0L7RgdC60LLQ\n' +
        //   'sDEVMBMGA1UEBwwM0JzQvtGB0LrQstCwMSUwIwYDVQQKDBzQntCe0J4gItCa0KDQ\n' +
        //   'mNCf0KLQni3Qn9Cg0J4iMTswOQYDVQQDDDLQotC10YHRgtC+0LLRi9C5INCj0KYg\n' +
        //   '0J7QntCeICLQmtCg0JjQn9Ci0J4t0J/QoNCeIjAeFw0yMjAxMTgwODAyMjZaFw0y\n' +
        //   'MjA0MTgwODEyMjZaMIGeMSMwIQYJKoZIhvcNAQkBFhRzcGlkZXJtYW5AbWFydmVs\n' +
        //   'LmNvbTEgMB4GA1UEAwwX0KfQtdC70L7QstC10Log0J/QsNGD0LoxDzANBgNVBAsM\n' +
        //   'Bk1hcnZlbDERMA8GA1UECgwIQXZlbmdlcnMxETAPBgNVBAcMCE5ldyBZb3JrMREw\n' +
        //   'DwYDVQQIDAhOZXcgWW9yazELMAkGA1UEBhMCVVMwZjAfBggqhQMHAQEBATATBgcq\n' +
        //   'hQMCAiQABggqhQMHAQECAgNDAARAtF+D7sFDBryDdkxztx51MNoJJhAVXmlKC4ZF\n' +
        //   'DLyx+4jsjwe3xK6ZNvOjSgBHMQWpNSAbvyhKBPQMocjYD59eaKOCAlowggJWMA8G\n' +
        //   'A1UdDwEB/wQFAwMH8AAwEwYDVR0lBAwwCgYIKwYBBQUHAwIwHQYDVR0OBBYEFP1e\n' +
        //   'Ns8JFLkrlbkzuJXzg4/uukvgMB8GA1UdIwQYMBaAFJuFXvuB3E1ZB1Fjz77f2ix/\n' +
        //   'yUQ8MIIBDwYDVR0fBIIBBjCCAQIwgf+ggfyggfmGgbVodHRwOi8vdGVzdGdvc3Qy\n' +
        //   'MDEyLmNyeXB0b3Byby5ydS9DZXJ0RW5yb2xsLyEwNDIyITA0MzUhMDQ0MSEwNDQy\n' +
        //   'ITA0M2UhMDQzMiEwNDRiITA0MzklMjAhMDQyMyEwNDI2JTIwITA0MWUhMDQxZSEw\n' +
        //   'NDFlJTIwITAwMjIhMDQxYSEwNDIwITA0MTghMDQxZiEwNDIyITA0MWUtITA0MWYh\n' +
        //   'MDQyMCEwNDFlITAwMjIoMSkuY3Jshj9odHRwOi8vdGVzdGdvc3QyMDEyLmNyeXB0\n' +
        //   'b3Byby5ydS9DZXJ0RW5yb2xsL3Rlc3Rnb3N0MjAxMigxKS5jcmwwgdoGCCsGAQUF\n' +
        //   'BwEBBIHNMIHKMEQGCCsGAQUFBzAChjhodHRwOi8vdGVzdGdvc3QyMDEyLmNyeXB0\n' +
        //   'b3Byby5ydS9DZXJ0RW5yb2xsL3Jvb3QyMDE4LmNydDA/BggrBgEFBQcwAYYzaHR0\n' +
        //   'cDovL3Rlc3Rnb3N0MjAxMi5jcnlwdG9wcm8ucnUvb2NzcDIwMTJnL29jc3Auc3Jm\n' +
        //   'MEEGCCsGAQUFBzABhjVodHRwOi8vdGVzdGdvc3QyMDEyLmNyeXB0b3Byby5ydS9v\n' +
        //   'Y3NwMjAxMmdzdC9vY3NwLnNyZjAKBggqhQMHAQEDAgNBAK0gwQLZitoDBhXsOIpy\n' +
        //   'RmneSH8HVmvzhmDUt8luFgH4b76VAWgphKDRuVHgWvieZ1U4q/t4OHHt2/7EzJAk\n' +
        //   'nWE=</ds:X509Certificate>\n' +
        //   '</ds:X509Data>\n' +
        //   '</ds:KeyInfo>\n' +
        //   '    <ds:Object>\n' +
        //   '<QualifyingProperties xmlns="http://uri.etsi.org/01903/v1.3.2#" Target="#base64-content-signature">\n' +
        //   '<SignedProperties Id="SignedPropertiesReferenceId1-51e4b1465-7ee7-584a-19bf-e317e6cb2ae">\n' +
        //   '<SignedSignatureProperties>\n' +
        //   '<SigningTime>2022-02-02T12:43:28.268Z</SigningTime>\n' +
        //   '<SigningCertificateV2>\n' +
        //   '<Cert>\n' +
        //   '<CertDigest>\n' +
        //   '<ds:DigestMethod xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Algorithm="urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256"/>\n' +
        //   '<ds:DigestValue xmlns:ds="http://www.w3.org/2000/09/xmldsig#">uAVhjfZf7DbrZa969Dw2Ex1MLHfvvuK9pU63fxvnc1w=</ds:DigestValue>\n' +
        //   '</CertDigest>\n' +
        //   '<IssuerSerialV2>MIIBKzCCARKkggEOMIIBCjEYMBYGBSqFA2QBEg0xMjM0NTY3ODkwMTIzMRowGAYIKoUDA4EDAQESDDAwMTIzNDU2Nzg5MDEvMC0GA1UECQwm0YPQuy4g0KHRg9GJ0ZHQstGB0LrQuNC5INCy0LDQuyDQtC4gMTgxCzAJBgNVBAYTAlJVMRkwFwYDVQQIDBDQsy4g0JzQvtGB0LrQstCwMRUwEwYDVQQHDAzQnNC+0YHQutCy0LAxJTAjBgNVBAoMHNCe0J7QniAi0JrQoNCY0J/QotCeLdCf0KDQniIxOzA5BgNVBAMMMtCi0LXRgdGC0L7QstGL0Lkg0KPQpiDQntCe0J4gItCa0KDQmNCf0KLQni3Qn9Cg0J4iAhN8AARxNuIAei7t9ceXAAEABHE2</IssuerSerialV2>\n' +
        //   '</Cert>\n' +
        //   '</SigningCertificateV2>\n' +
        //   '</SignedSignatureProperties>\n' +
        //   '</SignedProperties>\n' +
        //   '</QualifyingProperties>\n' +
        //   '</ds:Object>\n' +
        //   '</ds:Signature>\n' +
        //   '</a>';

        try {
          __cadesAsyncToken__ + cadesSignedXML.Verify(signature);
          console.log('ok');
        } catch (err) {
          console.log('Failed to verify signature. Error: ' + cadesplugin.getLastError(err));
        }

        return btoa(
          encodeURIComponent(signature).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt('0x' + p1, 16)),
          ),
        );
      }),
    );
  },
);

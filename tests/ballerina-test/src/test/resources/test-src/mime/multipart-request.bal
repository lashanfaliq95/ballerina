import ballerina.net.http;

import ballerina.mime;

@http:configuration {basePath:"/test"}
service<http> helloServer {

    @http:resourceConfig {
        methods:["POST"],
        path:"/textbodypart"
    }
    resource multipart1 (http:Connection conn, http:InRequest request) {
        var bodyParts, _ = request.getMultiparts();
        var textContent, _ = bodyParts[0].getText();
        http:OutResponse response = {};
        response.setStringPayload(textContent);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/jsonbodypart"
    }
    resource multipart2 (http:Connection conn, http:InRequest request) {
        var bodyParts, _ = request.getMultiparts();
        var jsonContent, _ = bodyParts[0].getJson();
        http:OutResponse response = {};
        response.setJsonPayload(jsonContent);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/xmlbodypart"
    }
    resource multipart3 (http:Connection conn, http:InRequest request) {
        var bodyParts, _ = request.getMultiparts();
        var xmlContent, _ = bodyParts[0].getXml();
        http:OutResponse response = {};
        response.setXmlPayload(xmlContent);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/binarybodypart"
    }
    resource multipart4 (http:Connection conn, http:InRequest request) {
        var bodyParts, _ = request.getMultiparts();
        var blobContent, _ = bodyParts[0].getBlob();
        http:OutResponse response = {};
        response.setBinaryPayload(blobContent);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/multipleparts"
    }
    resource multipart5 (http:Connection conn, http:InRequest request) {
        var bodyParts, _ = request.getMultiparts();
        int i = 0;
        string content = "";
        while (i < lengthof bodyParts) {
            mime:Entity part = bodyParts[i];
            content = content + " -- " + handleContent(part);
            i = i + 1;
        }
        http:OutResponse response = {};
        response.setStringPayload(content);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/emptyparts"
    }
    resource multipart6 (http:Connection conn, http:InRequest request) {
        var entity, entityError = request.getMultiparts();
        http:OutResponse response = {};
        response.setStringPayload(entityError.message);
        _ = conn.respond(response);
    }

    @http:resourceConfig {
        methods:["POST"],
        path:"/nestedparts"
    }
    resource multipart7 (http:Connection conn, http:InRequest request) {
        var parentParts, _ = request.getMultiparts();
        int i = 0;
        string content = "";
        while (i < lengthof parentParts) {
            mime:Entity parentPart = parentParts[i];
            content = handleNestedParts(parentPart);
            i = i + 1;
        }
        http:OutResponse response = {};
        response.setStringPayload(content);
        _ = conn.respond(response);
    }
}

function handleNestedParts (mime:Entity parentPart) (string) {
    var childParts, _ = parentPart.getBodyParts();
    int i = 0;
    string content = "";
    if (childParts != null) {
        while (i < lengthof childParts) {
            mime:Entity childPart = childParts[i];
            content = content + handleContent(childPart);
            i = i + 1;
        }
    }
    return content;
}

function handleContent (mime:Entity bodyPart) (string) {
    string contentType = bodyPart.contentType.toString();
    if (mime:APPLICATION_XML == contentType || mime:TEXT_XML == contentType) {
        var xmlContent, _ = bodyPart.getXml();
        return xmlContent.getTextValue();
    } else if (mime:APPLICATION_JSON == contentType) {
        var jsonContent, _ = bodyPart.getJson();
        var jsonValue, _ = (string)jsonContent.bodyPart;
        return jsonValue;
    } else if (mime:TEXT_PLAIN == contentType) {
        var textData, _ = bodyPart.getText();
        return textData;
    } else if (mime:APPLICATION_OCTET_STREAM == contentType) {
        var blobContent, _ = bodyPart.getBlob();
        return blobContent.toString(mime:DEFAULT_CHARSET);
    }
    return null;
}

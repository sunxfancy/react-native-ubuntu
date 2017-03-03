//
// Created by sxf on 3/3/17.
//

#include "reactwebsocket.h"
#include "reactbridge.h"
#include <QtWebSockets/QtWebSockets>

ReactWebSocket::ReactWebSocket(QObject* parent)
    : QObject(parent)
{

}


ReactWebSocket::~ReactWebSocket() {

}


void ReactWebSocket::setBridge(ReactBridge* bridge) {
    this->m_bridge = bridge;
}

QString ReactWebSocket::moduleName() {
    return "RCTWebSocketModule";
}

QList<ReactModuleMethod*> ReactWebSocket::methodsToExport() {
    return QList<ReactModuleMethod*>{};
}

QVariantMap ReactWebSocket::constantsToExport() {
    return QVariantMap{};
}


void ReactWebSocket::connect(const QUrl &url, const QVariantList &protocols, const QVariantMap &options, int socketId) {
    QWebSocket* webSocket = new QWebSocket();
    m_connections.insert(socketId, webSocket);
}

void ReactWebSocket::send(const QByteArray &data, int socketId) {

}

void ReactWebSocket::sendBinary(const QByteArray &data, int socketId) {

}

void ReactWebSocket::close(int statusCode, const QString &closeReason, int socketId) {

}

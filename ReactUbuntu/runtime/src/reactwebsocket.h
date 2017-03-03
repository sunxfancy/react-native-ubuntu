//
// Created by sxf on 3/3/17.
//

#ifndef PROJECT_REACTWEBSOCKET_H
#define PROJECT_REACTWEBSOCKET_H

#include <QObject>
#include <QtCore/QMap>
#include "reactmoduleinterface.h"

class ReactBridge;
class QWebSocket;

class ReactWebSocket
        : public QObject
        , public ReactModuleInterface
{

    Q_OBJECT
    Q_INTERFACES(ReactModuleInterface)

    Q_INVOKABLE void connect(const QUrl& url,
                             const QVariantList& protocols,
                             const QVariantMap& options,
                             int socketId);

    Q_INVOKABLE void send(const QByteArray& data,
                          int socketId);
    Q_INVOKABLE void sendBinary(const QByteArray& data,
                                int socketId);

    Q_INVOKABLE void close(int statusCode, const QString& closeReason, int socketId);

public:
    ReactWebSocket(QObject* parent = 0);
    ~ReactWebSocket();

    void setBridge(ReactBridge* bridge) override;
    QString moduleName() override;
    QList<ReactModuleMethod*> methodsToExport() override;
    QVariantMap constantsToExport() override;

private:
    QPointer<ReactBridge> m_bridge;
    QMap<int, QWebSocket*> m_connections;
};


#endif //PROJECT_REACTWEBSOCKET_H

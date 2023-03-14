<?php

namespace App\WebSocket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketHandler implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $this->broadcast($from, $msg);
        $data = $this->convertReceivedData($msg);

        if ($data) {
            echo "Custom event received from client: {$data['message']}\n";
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    private function convertReceivedData($data) {
        $array = json_decode($data, true);
        if ($array === null) {
            // Handle error in JSON decoding if necessary
        }

        return $array;
    }

    private function broadcast(ConnectionInterface $from, $data) {
        foreach ($this->clients as $client) {
            if ($client !== $from) {
                $client->send($data);
            }
        }
    }
}
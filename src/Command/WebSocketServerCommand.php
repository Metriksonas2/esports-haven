<?php

namespace App\Command;

use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\WebSocket\WebSocketHandler;

class WebSocketServerCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('websocket:server')
            ->setDescription('Starts the WebSocket server.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $allowedOrigins = ['https://localhost:8000'];

        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new WebSocketHandler()
                )
            ),
            8080
        );

        $output->writeln('WebSocket server started.');

        $server->run();
    }
}
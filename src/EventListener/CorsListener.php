<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class CorsListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            ResponseEvent::class => 'onKernelResponse'
        ];
    }

    public function onKernelResponse(ResponseEvent $event)
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $response = $event->getResponse();

        $response->headers->set('Access-Control-Allow-Origin', 'https://127.0.0.1:8000/');
    }
}
<?php

namespace App\Controller;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function confirm(InertiaInterface $inertia): Response
    {
        $isLoggedIn = (bool)$this->getUser();

        if ($isLoggedIn) {
            return $inertia->render("Tournaments/Dashboard", []);
        }

        return $inertia->render("Index/Index", [
            'isLoggedIn' => $isLoggedIn
        ]);
    }
}
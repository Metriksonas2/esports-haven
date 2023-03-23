<?php

declare(strict_types=1);


namespace App\Controller\Schedule;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/schedule', name: 'app_schedule_')]
class ScheduleController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        return $inertia->render("Schedule/Index", []);
    }
}
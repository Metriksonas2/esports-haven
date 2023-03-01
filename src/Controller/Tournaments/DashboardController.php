<?php

namespace App\Controller\Tournaments;

use App\Repository\TournamentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Rompetomp\InertiaBundle\Service\InertiaInterface;

#[Route('/', name: 'app_dashboard_')]
class DashboardController extends AbstractController
{}

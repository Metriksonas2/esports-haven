<?php

namespace App\DataFixtures;

use App\Entity\Tournament;
use App\Enum\BracketType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Create 10 tournaments
        for ($i = 1; $i <= 10; $i++) {
            $tournament = new Tournament();
            $tournament->setName("Tournament #" . $i);
            $tournament->setDescription("Tournament description...");
            $tournament->setGame("League of Legends");
            $tournament->setWithThirdPlaceMatch(false);
            $tournament->setRules("Tournament rules...");

            $manager->persist($tournament);
        }

        $manager->flush();
    }
}

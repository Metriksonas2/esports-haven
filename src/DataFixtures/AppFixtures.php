<?php

namespace App\DataFixtures;

use App\Entity\Game;
use App\Entity\Tournament;
use App\Enum\BracketType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Add games
//        foreach (GameType::cases() as $gameType) {
//            $game = new Game();
//            $game->setName($gameType->value);
//
//            $manager->persist($game);
//        }
//
//        $manager->flush();
    }
}

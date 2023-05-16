<?php

namespace App\Tests\LevelingServiceTests;

use App\Entity\User;
use App\Enum\ExperiencePointsType;
use App\Enum\LevelType;
use App\Service\LevelingService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class LevelingServiceTest extends TestCase
{
    private $entityManagerMock;
    private $levelingService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->levelingService = new LevelingService($this->entityManagerMock);
    }

    public function testCheckLevelUp()
    {
        $user = new User();
        $user->setLevel(1);
        $user->setExperiencePoints(100);

        // Test when $fromDb is true and the user should level up
        $this->levelingService->checkLevelUp($user);
        $this->assertEquals(2, $user->getLevel());
        $this->assertEquals(0, $user->getExperiencePoints());

        // Test when $fromDb is true and the user should not level up
        $user->setLevel(LevelType::getLastLevel());
        $user->setExperiencePoints(100);
        $this->levelingService->checkLevelUp($user);
        $this->assertEquals(LevelType::getLastLevel(), $user->getLevel());
        $this->assertEquals(100, $user->getExperiencePoints());

        // Test when $fromDb is false and the user should level up
        $user->setLevel(2);
        $user->setExperiencePoints(100);
        $newExperiencePoints = 250;
        $this->levelingService->checkLevelUp($user, false, $newExperiencePoints);
        $this->assertEquals(3, $user->getLevel());
        $this->assertEquals(50, $user->getExperiencePoints());

        // Test when $fromDb is false and the user should not level up
        $user->setLevel(LevelType::getLastLevel());
        $user->setExperiencePoints(200);
        $this->levelingService->checkLevelUp($user, false, $user->getExperiencePoints());
        $this->assertEquals(LevelType::getLastLevel(), $user->getLevel());
        $this->assertEquals(200, $user->getExperiencePoints());
    }

    public function testAddExperiencePoints()
    {
        $user = new User();
        $user->setLevel(1);
        $user->setExperiencePoints(100);

        $this->levelingService->addExperiencePoints($user, ExperiencePointsType::TOURNAMENT_WIN);

        $this->assertEquals(40, $user->getExperiencePoints());
        $this->assertEquals(2, $user->getLevel());
    }

    public function testGetUserPercentage()
    {
        $user = new User();
        $user->setLevel(2);
        $user->setExperiencePoints(100);

        $percentage = $this->levelingService->getUserPercentage($user);
        $this->assertEquals(50, $percentage);

        $user->setLevel(4);
        $user->setExperiencePoints(300);

        $percentage = $this->levelingService->getUserPercentage($user);
        $this->assertEquals(75, $percentage);
    }

}
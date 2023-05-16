<?php

namespace App\Tests\AchievementServiceTests;

use App\AchievementInterface;
use App\Entity\Achievement;
use App\Entity\User;
use App\Enum\AchievementType;
use App\Repository\AchievementRepository;
use App\Service\AchievementService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class AchievementServiceTest extends TestCase
{
    private $entityManagerMock;
    private $achievementService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->achievementService = new AchievementService($this->entityManagerMock);
    }
    public function testUnlockAchievement()
    {
        $achievementType = AchievementType::FIRST_TASTE;
        $achievementRepository = $this->createMock(AchievementRepository::class);
        $user = new User();

        $achievement = new Achievement();
        $achievement->setName($achievementType->value);
        $this->entityManagerMock->expects($this->once())
            ->method('getRepository')
            ->willReturn($achievementRepository);
        $achievementRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['name' => $achievementType->value])
            ->willReturn($achievement);
        $this->entityManagerMock->expects($this->once())
            ->method('flush')
            ->willReturnSelf();

        $this->achievementService->unlockAchievement($user, $achievementType);

        $this->assertEquals(1, count($user->getAchievements()));
    }

    public function testHasAchievement()
    {
        $user = new User();

        $achievementType = AchievementType::FIRST_TASTE;

        $achievement = new Achievement();
        $achievement->setName($achievementType->value);
        $user->addAchievement($achievement);

        $result = $this->achievementService->hasAchievement($user, $achievementType);

        $this->assertTrue($result);
        $this->assertEquals(1, count($user->getAchievements()));
    }

    public function testCheckForAchievement()
    {
        $user = new User();
        $achievement = $this->createMock(AchievementInterface::class);

        $expectedResult = true;

        $achievement->expects($this->once())
            ->method('check')
            ->with($user)
            ->willReturn($expectedResult);


        $result = $this->achievementService->checkForAchievement($user, $achievement);

        $this->assertEquals($expectedResult, $result);
    }
}
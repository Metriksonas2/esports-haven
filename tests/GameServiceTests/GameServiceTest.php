<?php

namespace App\Tests\GameServiceTests;

use App\Entity\Endorsement;
use App\Entity\Game;
use App\Entity\User;
use App\Repository\EndorsementRepository;
use App\Repository\GameRepository;
use App\Service\GameService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class GameServiceTest extends TestCase
{
    private $entityManagerMock;
    private $gameService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->gameService = new GameService($this->entityManagerMock);
    }

    public function testGenerateSelectedGamesArray()
    {
        $user = new User();
        $game1 = new Game();
        $endorsementRepository = $this->createMock(EndorsementRepository::class);
        $game1->setName('League of Legends');
        $game2 = new Game();
        $game2->setName('Brawlhalla');
        $selectedGames = new ArrayCollection([$game1, $game2]);

        $this->entityManagerMock->expects($this->exactly(2))
            ->method('getRepository')
            ->willReturn($endorsementRepository);
        $endorsementRepository->expects($this->exactly(2))
            ->method('findBy')
            ->withAnyParameters()
            ->willReturn([]);
        $selectedGamesArray = $this->gameService->generateSelectedGamesArray($selectedGames, $user);

        $this->assertCount(2, $selectedGamesArray);

        $this->assertEquals('League of Legends', $selectedGamesArray[0]['value']);
        $this->assertEquals('League of Legends', $selectedGamesArray[0]['label']);
        $this->assertEquals(0, $selectedGamesArray[0]['endorsements']);

        $this->assertEquals('Brawlhalla', $selectedGamesArray[1]['value']);
        $this->assertEquals('Brawlhalla', $selectedGamesArray[1]['label']);
        $this->assertEquals(0, $selectedGamesArray[1]['endorsements']);
    }
}
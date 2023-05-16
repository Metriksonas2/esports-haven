<?php

namespace App\Tests\TournamentMatchServiceTests;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Service\TournamentMatchService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class TournamentMatchServiceTest extends TestCase
{
    private $entityManagerMock;
    private $tournamentMatchService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->tournamentMatchService = new TournamentMatchService($this->entityManagerMock);
    }

    public function testTryAddParticipantWithZeroParticipants()
    {
        // Create the necessary objects and variables for testing
        $matchArrayObject = [
            'participants' => [
                ['id' => 'TBD'],
                ['id' => 'TBD']
            ]
        ];
        $newTournamentMatch = new TournamentMatch();
        $participantsIndex = 0;

        $participants = [];
        for ($i = 0; $i < 2; $i++) {
            $participants[] = $this->getMockBuilder(Participant::class)
                ->disableOriginalConstructor()
                ->getMock();
        }

        // Call the method being tested
        $this->tournamentMatchService->tryAddParticipant(0, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);
        $this->tournamentMatchService->tryAddParticipant(1, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);

        // Assert the changes made by the method
        $this->assertEquals(0, count($newTournamentMatch->getParticipants()));
        $this->assertEquals(0, $participantsIndex);
    }

    public function testTryAddParticipantWithOneParticipant()
    {
        // Create the necessary objects and variables for testing
        $matchArrayObject = [
            'participants' => [
                ['id' => '1'],
                ['id' => 'TBD']
            ]
        ];
        $newTournamentMatch = new TournamentMatch();
        $participantsIndex = 0;

        $participants = [];
        for ($i = 0; $i < 2; $i++) {
            $participants[] = $this->getMockBuilder(Participant::class)
                ->disableOriginalConstructor()
                ->getMock();
        }

        // Call the method being tested
        $this->tournamentMatchService->tryAddParticipant(0, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);
        $this->tournamentMatchService->tryAddParticipant(1, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);

        // Assert the changes made by the method
        $this->assertEquals(1, count($newTournamentMatch->getParticipants()));
        $this->assertEquals(1, $participantsIndex);
    }

    public function testTryAddParticipantWithTwoParticipants()
    {
        // Create the necessary objects and variables for testing
        $matchArrayObject = [
            'participants' => [
                ['id' => '1'],
                ['id' => '2']
            ]
        ];
        $newTournamentMatch = new TournamentMatch();
        $participantsIndex = 0;

        $participants = [];
        for ($i = 0; $i < 2; $i++) {
            $participants[] = $this->getMockBuilder(Participant::class)
                ->disableOriginalConstructor()
                ->getMock();
        }

        // Call the method being tested
        $this->tournamentMatchService->tryAddParticipant(0, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);
        $this->tournamentMatchService->tryAddParticipant(1, $matchArrayObject, $newTournamentMatch, $participantsIndex, $participants);

        // Assert the changes made by the method
        $this->assertEquals(2, count($newTournamentMatch->getParticipants()));
        $this->assertEquals(2, $participantsIndex);
    }

    public function testCheckIfGhostMatchWhenTrue()
    {
        // Create the necessary objects and variables for testing
        $matchArrayObject = [
            'participants' => [
                ['id' => '-'],
                ['id' => '-']
            ]
        ];
        $newTournamentMatch = new TournamentMatch();

        // Call the method being tested
        $isGhostMatch = $this->tournamentMatchService->checkIfGhostMatch($matchArrayObject, $newTournamentMatch);

        // Assert the changes made by the method
        $this->assertTrue($isGhostMatch);
        $this->assertTrue($newTournamentMatch->isIsGhostMatch());
    }

    public function testCheckIfGhostMatchWhenFalse()
    {
        // Create the necessary objects and variables for testing
        $matchArrayObject = [
            'participants' => [
                ['id' => '2'],
                ['id' => '8']
            ]
        ];
        $newTournamentMatch = new TournamentMatch();

        // Call the method being tested
        $isGhostMatch = $this->tournamentMatchService->checkIfGhostMatch($matchArrayObject, $newTournamentMatch);

        // Assert the changes made by the method
        $this->assertFalse($isGhostMatch);
        $this->assertFalse($newTournamentMatch->isIsGhostMatch());
    }
}
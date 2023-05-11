<?php

namespace App\Tests\TournamentServiceTests;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Service\TournamentMatchService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class TournamentServiceTest extends TestCase
{
    public function testSaveTournamentMatchesWithLog2N()
    {
        // Create a mock Tournament object
        $tournament = $this->createMock(Tournament::class);
        $entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $participants = [];
        for ($i = 0; $i < 4; $i++) {
            $participants[] = $this->getMockBuilder(Participant::class)
                ->disableOriginalConstructor()
                ->getMock();
        }

        // Set up other necessary dependencies
        $matchName = 'PHPUnit Match';
        $state = 'active';
        $matches = [
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ongoing', 'participants' => [
                ['id' => 1],
                ['id' => 2],
            ]],
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ongoing', 'participants' => [
                ['id' => 3],
                ['id' => 4],
            ]],
            ['startTime' => '2023-05-02 14:00:00', 'state' => 'upcoming', 'participants' => [
                ['id' => 'TBD'],
                ['id' => 'TBD'],
            ]],
        ];

        // Create an instance of the class under test
        $tournamentService = new TournamentMatchService($entityManagerMock);

        // Call the method being tested
        $result = $tournamentService->saveTournamentMatches($tournament, $matchName, $state, $participants, $matches);

        // Assert the expected outcome
        $this->assertIsArray($result);
        $this->assertCount(3, $result);
        $this->assertInstanceOf(TournamentMatch::class, $result[0]);
        $this->assertInstanceOf(TournamentMatch::class, $result[1]);
        $this->assertInstanceOf(TournamentMatch::class, $result[2]);
    }

    public function testSaveTournamentMatchesWithoutLog2N()
    {
        // Create a mock Tournament object
        $tournament = $this->createMock(Tournament::class);
        $entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $participants = [];
        for ($i = 0; $i < 6; $i++) {
            $participants[] = $this->getMockBuilder(Participant::class)
                ->disableOriginalConstructor()
                ->getMock();
        }

        // Set up other necessary dependencies
        $matchName = 'PHPUnit Match';
        $state = 'active';
        $matches = [
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ghost', 'participants' => [
                ['id' => '-'],
                ['id' => '-'],
            ]],
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ongoing', 'participants' => [
                ['id' => 1],
                ['id' => 2],
            ]],
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ghost', 'participants' => [
                ['id' => '-'],
                ['id' => '-'],
            ]],
            ['startTime' => '2023-05-01 10:00:00', 'state' => 'ongoing', 'participants' => [
                ['id' => 3],
                ['id' => 4],
            ]],
            ['startTime' => '2023-05-02 14:00:00', 'state' => 'upcoming', 'participants' => [
                ['id' => 'TBD'],
                ['id' => 5],
            ]],
            ['startTime' => '2023-05-02 14:00:00', 'state' => 'upcoming', 'participants' => [
                ['id' => 'TBD'],
                ['id' => 6],
            ]],
            ['startTime' => '2023-05-02 18:00:00', 'state' => 'upcoming', 'participants' => [
                ['id' => 'TBD'],
                ['id' => 'TBD'],
            ]],
        ];

        // Create an instance of the class under test
        $tournamentService = new TournamentMatchService($entityManagerMock);

        // Call the method being tested
        $result = $tournamentService->saveTournamentMatches($tournament, $matchName, $state, $participants, $matches);

        // Assert the expected outcome
        $this->assertIsArray($result);
        $this->assertCount(7, $result);
        for ($i = 0; $i < 7; $i++) {
            $this->assertInstanceOf(TournamentMatch::class, $result[$i]);
        }
        // Additional assertions based on the expected behavior of the method
    }
}
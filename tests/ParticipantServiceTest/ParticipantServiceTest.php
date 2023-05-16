<?php

namespace App\Tests\ParticipantServiceTest;

use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\User;
use App\Repository\ParticipantRepository;
use App\Service\ParticipantService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class ParticipantServiceTest extends TestCase
{
    private $entityManagerMock;
    private $participantService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->participantService = new ParticipantService($this->entityManagerMock);
    }

    public function testSaveParticipants()
    {
        // Create a mock Tournament object and EntityManager
        $tournament = $this->getMockBuilder(Tournament::class)->getMock();
        $entityManager = $this->getMockBuilder(EntityManagerInterface::class)->getMock();

        // Set up the necessary input data for testing
        $participants = [
            [
                'user' => 1,
                'name' => 'Participant 1',
            ],
            [
                'user' => 2,
                'name' => 'Participant 2',
            ],
        ];
        $resultText = 'Some result text';

        // Set up expectations for the EntityManager's methods
        $participantRepository = $this->getMockBuilder(ParticipantRepository::class)->getMock();
        $user = $this->getMockBuilder(User::class)
            ->setConstructorArgs([1]) // Set the ID during object creation
            ->getMock();
        $participantRepository->expects($this->exactly(2))
            ->method('find')
            ->willReturn($user);
        $entityManager->expects($this->exactly(2))
            ->method('getRepository')
            ->willReturn($participantRepository);
        $entityManager->expects($this->exactly(2))
            ->method('persist')
            ->willReturnSelf();
        $entityManager->expects($this->once())
            ->method('flush')
            ->willReturnSelf();

        // Call the method being tested
        $result = $this->participantService->saveParticipants($participants, $tournament, $resultText, true);

        // Assert the result and changes made by the method
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

        foreach ($result as $participant) {
            $this->assertInstanceOf(Participant::class, $participant);
            $this->assertSame($tournament, $participant->getTournament());
            $this->assertSame($resultText, $participant->getResultText());
        }
    }

}
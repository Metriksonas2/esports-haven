<?php

namespace App\Entity;

use App\Enum\MatchPlacement;
use App\Repository\TournamentMatchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TournamentMatchRepository::class)]
class TournamentMatch
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(length: 255)]
    private ?string $state = null;

    #[ORM\ManyToOne(inversedBy: 'tournamentMatches')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tournament $tournament = null;

    #[ORM\Column(type: "string", length: 255, enumType: MatchPlacement::class)]
    private ?MatchPlacement $placement = null;

    #[ORM\ManyToMany(targetEntity: Participant::class, inversedBy: 'matches')]
    private Collection $participants;

    #[ORM\ManyToOne(inversedBy: 'wonMatches')]
    private ?Participant $winnerParticipant = null;

    #[ORM\ManyToOne(targetEntity: self::class)]
    private ?self $nextMatch = null;

    #[ORM\Column]
    private ?bool $isGhostMatch = false;

    public function __construct()
    {
        $this->placement = MatchPlacement::UPPER;
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getTournament(): ?Tournament
    {
        return $this->tournament;
    }

    public function setTournament(?Tournament $tournament): self
    {
        $this->tournament = $tournament;

        return $this;
    }

    public function getPlacement(): MatchPlacement
    {
        return $this->placement;
    }

    public function setPlacement(?MatchPlacement $placement): self
    {
        $this->placement = $placement;

        return $this;
    }

    /**
     * @return Collection<int, Participant>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants->add($participant);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        $this->participants->removeElement($participant);

        return $this;
    }

    public function getWinnerParticipant(): ?Participant
    {
        return $this->winnerParticipant;
    }

    public function setWinnerParticipant(?Participant $winnerParticipant): self
    {
        $this->winnerParticipant = $winnerParticipant;

        return $this;
    }

    public function getNextMatch(): ?self
    {
        return $this->nextMatch;
    }

    public function setNextMatch(?self $nextMatch): self
    {
        $this->nextMatch = $nextMatch;

        return $this;
    }

    public function isIsGhostMatch(): ?bool
    {
        return $this->isGhostMatch;
    }

    public function setIsGhostMatch(bool $isGhostMatch): self
    {
        $this->isGhostMatch = $isGhostMatch;

        return $this;
    }
}

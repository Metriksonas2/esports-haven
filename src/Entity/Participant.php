<?php

namespace App\Entity;

use App\Repository\ParticipantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ParticipantRepository::class)]
class Participant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $resultText = 'WON';

    #[ORM\ManyToMany(targetEntity: TournamentMatch::class, mappedBy: 'participants')]
    private Collection $matches;

    #[ORM\OneToMany(mappedBy: 'winnerParticipant', targetEntity: TournamentMatch::class)]
    private Collection $wonMatches;

    #[ORM\Column(length: 255)]
    private ?string $tournamentName = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tournament $tournament = null;

    public function __construct()
    {
        $this->matches = new ArrayCollection();
        $this->wonMatches = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getResultText(): ?string
    {
        return $this->resultText;
    }

    public function setResultText(?string $resultText): self
    {
        $this->resultText = $resultText;

        return $this;
    }

    /**
     * @return Collection<int, TournamentMatch>
     */
    public function getMatches(): Collection
    {
        return $this->matches;
    }

    public function addMatch(TournamentMatch $match): self
    {
        if (!$this->matches->contains($match)) {
            $this->matches->add($match);
            $match->addParticipant($this);
        }

        return $this;
    }

    public function removeMatch(TournamentMatch $match): self
    {
        if ($this->matches->removeElement($match)) {
            $match->removeParticipant($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, TournamentMatch>
     */
    public function getWonMatches(): Collection
    {
        return $this->wonMatches;
    }

    public function addWonMatch(TournamentMatch $wonMatch): self
    {
        if (!$this->wonMatches->contains($wonMatch)) {
            $this->wonMatches->add($wonMatch);
            $wonMatch->setWinnerParticipant($this);
        }

        return $this;
    }

    public function removeWonMatch(TournamentMatch $wonMatch): self
    {
        if ($this->wonMatches->removeElement($wonMatch)) {
            // set the owning side to null (unless already changed)
            if ($wonMatch->getWinnerParticipant() === $this) {
                $wonMatch->setWinnerParticipant(null);
            }
        }

        return $this;
    }

    public function getTournamentName(): ?string
    {
        return $this->tournamentName;
    }

    public function setTournamentName(string $tournamentName): self
    {
        $this->tournamentName = $tournamentName;

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
}

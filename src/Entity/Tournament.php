<?php

namespace App\Entity;

use App\Enum\BracketType;
use App\Repository\TournamentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TournamentRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Tournament
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('tournaments')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('tournaments')]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('tournaments')]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('tournaments')]
    private ?string $game = null;

    #[ORM\Column]
    #[Groups('tournaments')]
    private ?bool $withThirdPlaceMatch = false;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('tournaments')]
    private ?string $rules = null;

    #[ORM\Column(type: "string", length: 255, enumType: BracketType::class)]
    #[Groups('tournaments')]
    private ?BracketType $bracketType = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups('tournaments')]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'tournament', targetEntity: TournamentMatch::class, orphanRemoval: true)]
    #[Groups('tournaments')]
    private Collection $tournamentMatches;

    #[ORM\ManyToOne(inversedBy: 'hostedTournaments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('tournaments')]
    private ?User $host = null;

    #[ORM\OneToMany(mappedBy: 'tournament', targetEntity: Participant::class, orphanRemoval: true)]
    private Collection $participants;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $startDate = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->tournamentMatches = new ArrayCollection();
        $this->bracketType = BracketType::SINGLE_ELIMINATION;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getGame(): ?string
    {
        return $this->game;
    }

    public function setGame(string $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function isWithThirdPlaceMatch(): ?bool
    {
        return $this->withThirdPlaceMatch;
    }

    public function setWithThirdPlaceMatch(bool $withThirdPlaceMatch): self
    {
        $this->withThirdPlaceMatch = $withThirdPlaceMatch;

        return $this;
    }

    public function getRules(): ?string
    {
        return $this->rules;
    }

    public function setRules(?string $rules): self
    {
        $this->rules = $rules;

        return $this;
    }

    public function getBracketType(): BracketType
    {
        return $this->bracketType;
    }

    public function setBracketType(BracketType $bracketType): self
    {
        $this->bracketType = $bracketType;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, TournamentMatch>
     */
    public function getTournamentMatches(): Collection
    {
        return $this->tournamentMatches;
    }

    public function addTournamentMatch(TournamentMatch $tournamentMatch): self
    {
        if (!$this->tournamentMatches->contains($tournamentMatch)) {
            $this->tournamentMatches->add($tournamentMatch);
            $tournamentMatch->setTournament($this);
        }

        return $this;
    }

    public function removeTournamentMatch(TournamentMatch $tournamentMatch): self
    {
        if ($this->tournamentMatches->removeElement($tournamentMatch)) {
            // set the owning side to null (unless already changed)
            if ($tournamentMatch->getTournament() === $this) {
                $tournamentMatch->setTournament(null);
            }
        }

        return $this;
    }

    public function getHost(): ?User
    {
        return $this->host;
    }

    public function setHost(?User $host): self
    {
        $this->host = $host;

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
            $participant->setTournament($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        if ($this->participants->removeElement($participant)) {
            // set the owning side to null (unless already changed)
            if ($participant->getTournament() === $this) {
                $participant->setTournament(null);
            }
        }

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }
}

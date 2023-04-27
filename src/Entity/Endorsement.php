<?php

namespace App\Entity;

use App\Enum\BracketType;
use App\Enum\GameType;
use App\Repository\EndorsementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EndorsementRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Endorsement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'endorsements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $endorsedUser = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $endorserUser = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'endorsements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Game $game = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEndorsedUser(): ?User
    {
        return $this->endorsedUser;
    }

    public function setEndorsedUser(?User $endorsedUser): self
    {
        $this->endorsedUser = $endorsedUser;

        return $this;
    }

    public function getEndorserUser(): ?User
    {
        return $this->endorserUser;
    }

    public function setEndorserUser(?User $endorserUser): self
    {
        $this->endorserUser = $endorserUser;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }
}

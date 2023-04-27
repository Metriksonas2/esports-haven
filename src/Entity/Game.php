<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: Endorsement::class)]
    private Collection $endorsements;

    public function __construct()
    {
        $this->endorsements = new ArrayCollection();
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

    /**
     * @return Collection<int, Endorsement>
     */
    public function getEndorsements(): Collection
    {
        return $this->endorsements;
    }

    public function addEndorsement(Endorsement $endorsement): self
    {
        if (!$this->endorsements->contains($endorsement)) {
            $this->endorsements->add($endorsement);
            $endorsement->setGame($this);
        }

        return $this;
    }

    public function removeEndorsement(Endorsement $endorsement): self
    {
        if ($this->endorsements->removeElement($endorsement)) {
            // set the owning side to null (unless already changed)
            if ($endorsement->getGame() === $this) {
                $endorsement->setGame(null);
            }
        }

        return $this;
    }
}

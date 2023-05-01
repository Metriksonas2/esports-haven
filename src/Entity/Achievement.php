<?php

namespace App\Entity;

use App\Repository\AchievementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AchievementRepository::class)]
class Achievement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'achievements')]
    private Collection $earnedUsers;

    public function __construct()
    {
        $this->earnedUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
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
     * @return Collection<int, User>
     */
    public function getEarnedUsers(): Collection
    {
        return $this->earnedUsers;
    }

    public function addEarnedUser(User $earnedUser): self
    {
        if (!$this->earnedUsers->contains($earnedUser)) {
            $this->earnedUsers->add($earnedUser);
            $earnedUser->addAchievement($this);
        }

        return $this;
    }

    public function removeEarnedUser(User $earnedUser): self
    {
        if ($this->earnedUsers->removeElement($earnedUser)) {
            $earnedUser->removeAchievement($this);
        }

        return $this;
    }
}

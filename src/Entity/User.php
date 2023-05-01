<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('users')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('users')]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups('users')]
    private ?string $lastName = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups('users')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups('users')]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(type: 'boolean')]
    private $isVerified = false;

    #[ORM\OneToMany(mappedBy: 'host', targetEntity: Tournament::class)]
    private Collection $hostedTournaments;

    #[ORM\OneToMany(mappedBy: 'endorsedUser', targetEntity: Endorsement::class)]
    private Collection $endorsements;

    #[ORM\OneToMany(mappedBy: 'toUser', targetEntity: FriendRequest::class, orphanRemoval: true)]
    private Collection $friendRequests;

    #[ORM\ManyToMany(targetEntity: User::class)]
    #[ORM\JoinTable(
        name: 'friends',
        joinColumns: [new ORM\JoinColumn(name: 'user_a_id', referencedColumnName: 'id')],
        inverseJoinColumns: [new ORM\JoinColumn('user_b_id', referencedColumnName: 'id')]
    )]
    private Collection $friends;

    #[ORM\OneToMany(mappedBy: 'winner', targetEntity: Tournament::class)]
    private Collection $wonTournaments;

    #[ORM\Column(length: 255)]
    #[Groups('users')]
    private ?string $profileImage = '/assets/images/avatar.jpg';

    #[ORM\Column(length: 255)]
    private ?string $coverImage = '/assets/images/cover.jpg';

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $position = '';

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $country = '';

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = '';

    #[ORM\ManyToMany(targetEntity: Game::class)]
    private Collection $selectedGames;

    #[ORM\ManyToMany(targetEntity: Achievement::class, inversedBy: 'earnedUsers')]
    private Collection $achievements;

    public function __construct()
    {
        $this->hostedTournaments = new ArrayCollection();
        $this->endorsements = new ArrayCollection();
        $this->friendRequests = new ArrayCollection();
        $this->friends = new ArrayCollection();
        $this->wonTournaments = new ArrayCollection();
        $this->selectedGames = new ArrayCollection();
        $this->achievements = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    /**
     * @return Collection<int, Tournament>
     */
    public function getHostedTournaments(): Collection
    {
        return $this->hostedTournaments;
    }

    public function addHostedTournament(Tournament $hostedTournament): self
    {
        if (!$this->hostedTournaments->contains($hostedTournament)) {
            $this->hostedTournaments->add($hostedTournament);
            $hostedTournament->setHost($this);
        }

        return $this;
    }

    public function removeHostedTournament(Tournament $hostedTournament): self
    {
        if ($this->hostedTournaments->removeElement($hostedTournament)) {
            // set the owning side to null (unless already changed)
            if ($hostedTournament->getHost() === $this) {
                $hostedTournament->setHost(null);
            }
        }

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
            $endorsement->setEndorsedUser($this);
        }

        return $this;
    }

    public function removeEndorsement(Endorsement $endorsement): self
    {
        if ($this->endorsements->removeElement($endorsement)) {
            // set the owning side to null (unless already changed)
            if ($endorsement->getEndorsedUser() === $this) {
                $endorsement->setEndorsedUser(null);
            }
        }

        return $this;
    }

    public function getFriendRequests(): array
    {
        return $this->friendRequests->toArray();
    }

    public function addFriendRequest(FriendRequest $friendRequest): self
    {
        if (!$this->friendRequests->contains($friendRequest)) {
            $this->friendRequests->add($friendRequest);
            $friendRequest->setToUser($this);
        }

        return $this;
    }

    public function removeFriendRequest(FriendRequest $friendRequest): self
    {
        if ($this->friendRequests->removeElement($friendRequest)) {
            // set the owning side to null (unless already changed)
            if ($friendRequest->getToUser() === $this) {
                $friendRequest->setToUser(null);
            }
        }

        return $this;
    }

    public function getFriends()
    {
        return $this->friends->toArray();
    }

    public function addFriend(User $user)
    {
        if (!$this->friends->contains($user)) {
            $this->friends->add($user);
            $user->addFriend($this);
        }
    }

    public function removeFriend(User $user)
    {
        if ($this->friends->contains($user)) {
            $this->friends->removeElement($user);
            $user->removeFriend($this);
        }
    }

    /**
     * @return Collection<int, Tournament>
     */
    public function getWonTournaments(): Collection
    {
        return $this->wonTournaments;
    }

    public function addWonTournament(Tournament $wonTournament): self
    {
        if (!$this->wonTournaments->contains($wonTournament)) {
            $this->wonTournaments->add($wonTournament);
            $wonTournament->setWinner($this);
        }

        return $this;
    }

    public function removeWonTournament(Tournament $wonTournament): self
    {
        if ($this->wonTournaments->removeElement($wonTournament)) {
            // set the owning side to null (unless already changed)
            if ($wonTournament->getWinner() === $this) {
                $wonTournament->setWinner(null);
            }
        }

        return $this;
    }

    public function getProfileImage(): ?string
    {
        return $this->profileImage;
    }

    public function setProfileImage(string $profileImage): self
    {
        $this->profileImage = $profileImage;

        return $this;
    }

    public function getCoverImage(): ?string
    {
        return $this->coverImage;
    }

    public function setCoverImage(string $coverImage): self
    {
        $this->coverImage = $coverImage;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

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

    /**
     * @return Collection<int, Game>
     */
    public function getSelectedGames(): Collection
    {
        return $this->selectedGames;
    }

    public function addSelectedGame(Game $selectedGame): self
    {
        if (!$this->selectedGames->contains($selectedGame)) {
            $this->selectedGames->add($selectedGame);
        }

        return $this;
    }

    public function removeSelectedGame(Game $selectedGame): self
    {
        $this->selectedGames->removeElement($selectedGame);

        return $this;
    }

    /**
     * @return Collection<int, Achievement>
     */
    public function getAchievements(): Collection
    {
        return $this->achievements;
    }

    public function addAchievement(Achievement $achievement): self
    {
        if (!$this->achievements->contains($achievement)) {
            $this->achievements->add($achievement);
        }

        return $this;
    }

    public function removeAchievement(Achievement $achievement): self
    {
        $this->achievements->removeElement($achievement);

        return $this;
    }
}

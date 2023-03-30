<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;

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
    #[Ignore]
    private ?string $password = null;

    #[ORM\Column(type: 'boolean')]
    private $isVerified = false;

    #[ORM\OneToMany(mappedBy: 'host', targetEntity: Tournament::class)]
    private Collection $hostedTournaments;

    #[ORM\OneToMany(mappedBy: 'endorsedUser', targetEntity: Endorsement::class)]
    private Collection $endorsements;

    public function __construct()
    {
        $this->hostedTournaments = new ArrayCollection();
        $this->endorsements = new ArrayCollection();
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
}

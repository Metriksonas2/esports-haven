<?php

namespace App\Dto;

use App\Entity\User;

class UserDto
{
    public ?int $id;
    public ?string $firstName;
    public ?string $lastName;
    public ?string $username;
    public ?string $email;
    public ?string $profileImage;
    public ?string $coverImage;
    public ?string $position;
    public ?string $country;
    public ?string $description;

    public function __construct(
        ?int $id, ?string $firstName,
        ?string $lastName, ?string $username,
        ?string $email, ?string $profileImage,
        ?string $coverImage, ?string $position,
        ?string $country, ?string $description,
    )
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->username = $username;
        $this->email = $email;
        $this->profileImage = $profileImage;
        $this->coverImage = $coverImage;
        $this->position = $position;
        $this->country = $country;
        $this->description = $description;
    }

    public static function createFromUser(User $user): UserDto
    {
        return new UserDto(
            $user->getId(),
            $user->getFirstName(),
            $user->getLastName(),
            $user->getUsername(),
            $user->getEmail(),
            $user->getProfileImage(),
            $user->getCoverImage(),
            $user->getPosition(),
            $user->getCountry(),
            $user->getDescription(),
        );
    }

    public static function createFromUsers(array $users): array
    {
        $usersArray = [];

        foreach ($users as $user) {
            $usersArray[] = self::createFromUser($user);
        }

        return $usersArray;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getProfileImage(): string
    {
        return $this->profileImage;
    }

    /**
     * @param string $profileImage
     */
    public function setProfileImage(string $profileImage): void
    {
        $this->profileImage = $profileImage;
    }

    public function getCoverImage(): string
    {
        return $this->coverImage;
    }

    public function setCoverImage(string $coverImage): void
    {
        $this->coverImage = $coverImage;
    }
}
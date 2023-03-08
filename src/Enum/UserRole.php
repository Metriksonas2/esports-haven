<?php

namespace App\Enum;

enum UserRole: string
{
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';

    public function isAdministrator(string $role): bool
    {
        return $role === self::ROLE_ADMIN;
    }
}
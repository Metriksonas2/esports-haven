<?php

namespace App\Service;

class ObjectService
{
    public function getObjectById(array $objects, int $id): object|null
    {
        foreach ($objects as $object) {
            if ($object->getId() === $id) {
                return $object;
            }
        }

        return null;
    }

    public function getFirstObjectWithoutId(array $objects, int $id): object|null
    {
        foreach ($objects as $object) {
            if ($object->getId() !== $id) {
                return $object;
            }
        }

        return null;
    }
}
<?php

declare(strict_types=1);


namespace App\Service;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class JsonSerializer
{
    private SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function serializeToJson($data, array $groups = []): string
    {
        return $this->serializer->serialize(
            $data,
            JsonEncoder::FORMAT,
            ['groups' => $groups]
        );
    }
}
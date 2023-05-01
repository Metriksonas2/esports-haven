<?php

namespace App\Command;

use App\Entity\Achievement;
use App\Enum\AchievementType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'initialize:achievements',
    description: 'Add all achievements to a database',
)]
class InitializeAchievementsCommand extends Command
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;

        parent::__construct();
    }

    protected function configure(): void
    {}

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $achievementTypes = AchievementType::cases();
        $achievementsCountInDb = count($this->entityManager->getRepository(Achievement::class)->findAll());
        $achievementsExist = $achievementsCountInDb > 0;

        if (!$achievementsExist) {
            foreach ($achievementTypes as $achievementType) {
                $achievement = new Achievement();
                $achievementData = AchievementType::getAchievementData($achievementType);
                $title = $achievementData['title'];
                $description = $achievementData['description'];

                $achievement->setName($achievementType->value);
                $achievement->setTitle($title);
                $achievement->setDescription($description);

                $this->entityManager->persist($achievement);
            }

            $this->entityManager->flush();

            $output->writeln(sprintf('%d achievements have been added to the database.', count($achievementTypes)));

            return Command::SUCCESS;
        } else {
            $output->writeln('Achievements already exist in the database');

            return Command::FAILURE;
        }
    }
}

<?php

namespace App\Command;

use App\Entity\Game;
use App\Enum\GameType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'initialize:games',
    description: 'Add all games to a database',
)]
class InitializeGamesCommand extends Command
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
        $gameTypes = GameType::cases();
        $gamesCountInDb = count($this->entityManager->getRepository(Game::class)->findAll());
        $gamesExist = $gamesCountInDb > 0;

        if (!$gamesExist) {
            foreach ($gameTypes as $gameType) {
                if ($gameType->value === 'none') {
                    continue;
                }

                $game = new Game();
                $game->setName($gameType->value);

                $this->entityManager->persist($game);
            }

            $this->entityManager->flush();

            $output->writeln(sprintf('%d games have been added to the database.', count($gameTypes)));

            return Command::SUCCESS;
        } else {
            $output->writeln('Games already exist in the database');

            return Command::FAILURE;
        }
    }
}

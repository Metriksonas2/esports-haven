<?php

namespace App\Enum;

enum TournamentStatusType: string
{
    case NOT_STARTED = "Not started";
    case IN_PROGRESS = "In progress";
    case FINISHED = "Finished";
}

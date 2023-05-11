import React, {useEffect, useState} from 'react';
import route from "../../Services/route";

import Navbar from "@/Components/Navbar/Navbar";
import {usePage} from "@inertiajs/inertia-react";

const Index = () => {
  const isLoggedIn = usePage().props.isLoggedIn;

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Index;

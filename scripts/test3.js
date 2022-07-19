import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Ramp-up from 1 to 15 virtual users (VUs) in 5s
    { duration: "5s", target: 15 },

    // Stay at rest on 15 VUs for 10s
    { duration: "10s", target: 15 },

    // Ramp-down from 15 to 0 VUs for 5s
    { duration: "5s", target: 0 },
  ],
};

// https://travelfy-mern-images-material.herokuapp.com/explore
// https://recharts-next-material-mongo.vercel.app/
// https://blogr-nextjs-prisma-postgres.vercel.app
// https://spacexstats-gatsby-chartjs.vercel.app/
// https://linktree.coding-to-music.workers.dev/

export default function () {
  const response = http.get("https://linktree.coding-to-music.workers.dev", {
    headers: { Accepts: "application/json" },
  });
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(0.3);
}

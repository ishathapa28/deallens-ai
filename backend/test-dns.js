import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.cagw6rd.mongodb.net",
  (error, addresses) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(addresses);
  }
);
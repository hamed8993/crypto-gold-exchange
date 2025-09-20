import DesktopTicketPage from "@/components/pages/desktopTicketPage";
import TicketPage from "@/components/pages/ticketPage";

function Ticket() {
  return(
    <>
      <DesktopTicketPage className="hidden md:block" />
      <TicketPage className="md:hidden" />
    </>
  )
}

export default Ticket;

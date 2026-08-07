import { STATES, type ConversationState } from "@/conversation/types";
import { StartState } from "@/conversation/states/StartState";
import { BookingTypeState } from "@/conversation/states/BookingTypeState";
import { DurationState } from "@/conversation/states/DurationState";
import { RiderCountState } from "@/conversation/states/RiderCountState";
import { NameState } from "@/conversation/states/NameState";
import { PhoneState } from "@/conversation/states/PhoneState";
import { EmailState } from "@/conversation/states/EmailState";
import { DateState } from "@/conversation/states/DateState";
import { TimeState } from "@/conversation/states/TimeState";
import { AgeCategoryState } from "@/conversation/states/AgeCategoryState";
import { MinorDetailsState } from "@/conversation/states/MinorDetailsState";
import { WaiverState } from "@/conversation/states/WaiverState";
import { ShuttleState } from "@/conversation/states/ShuttleState";
import { NotesState } from "@/conversation/states/NotesState";
import { ConfirmationState } from "@/conversation/states/ConfirmationState";

export class StateFactory {
  create(stateName: string): ConversationState {
    switch (stateName) {
      case STATES.START:
        return new StartState();
      case STATES.BOOKING_TYPE:
        return new BookingTypeState();
      case STATES.SELECT_DURATION:
        return new DurationState();
      case STATES.SELECT_RIDER_COUNT:
        return new RiderCountState();
      case STATES.ENTER_NAME:
        return new NameState();
      case STATES.ENTER_PHONE:
        return new PhoneState();
      case STATES.ENTER_EMAIL:
        return new EmailState();
      case STATES.SELECT_DATE:
        return new DateState();
      case STATES.SELECT_TIME:
        return new TimeState();
      case STATES.SELECT_AGE_CATEGORY:
        return new AgeCategoryState();
      case STATES.ENTER_MINOR_DETAILS:
        return new MinorDetailsState();
      case STATES.WAIVER:
        return new WaiverState();
      case STATES.SHUTTLE:
        return new ShuttleState();
      case STATES.NOTES:
        return new NotesState();
      case STATES.CONFIRMATION:
        return new ConfirmationState();
      case STATES.HANDOFF:
        return new StartState();
      default:
        return new StartState();
    }
  }
}

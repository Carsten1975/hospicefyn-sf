import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faPerson, faHeartPulse, faBed, faHeart } from "@fortawesome/free-solid-svg-icons";

const ICONS = { leaf: faLeaf, person: faPerson, heartbeat: faHeartPulse, bed: faBed };

export default function SupportIcon({ name }) {
  return <FontAwesomeIcon icon={ICONS[name] || faHeart} aria-hidden="true" />;
}

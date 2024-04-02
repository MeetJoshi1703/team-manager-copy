import React from 'react';
import './cardStyles.css';
import { useDispatch,useSelector } from 'react-redux';
import { addTeamMember } from '../../store/reducer';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const { name, email, id, domain, description, avatar,available, _id } = props
  const dispatch = useDispatch();
  const { team, showModal } = useSelector((state) => state.team);

  const handleAddToTeam = (user) => {
    dispatch(addTeamMember(user));
  };

  const isUserInTeam = (userId) => {
    
      if(team.member_id){
        return team.member_id.some((id) => id === userId);
        
      }
      return false
  };

  return (
    <div className="custom-card">
      <div className="custom-card-left">      
        <div className="custom-information">
          <div className="custom-info">
            <span className="custom-title">Name</span>
            <h3>{name}</h3>
          </div>
          <div className="custom-info">
            <span className="custom-title">Email</span>
            <h3>{email}</h3>
          </div>
          <div className="custom-info">
            <span className="custom-title">Id</span>
            <h3>{id}</h3>
          </div>
        </div>

        <div className="custom-role">
          <span>Domain: {domain}</span>
        </div>

        <div className="custom-description">
          <p>{description}</p>
        </div>

        <div className="custom-buttons">
        <Link to={`user/${_id}`}>
          <button className="custom-btn custom-btn-blue">View Details</button>
        </Link>

           {available ? (
            isUserInTeam(_id) ? (
              <button disabled className="custom-btn custom-btn-blue-outline">Already in Team</button>
            ) : (
              <button onClick={() => handleAddToTeam({ name, domain, _id })} className="custom-btn custom-btn-blue-outline">Add to Team</button>
            )
          ) : (
            <button disabled className="custom-btn custom-btn-blue-outline"> (Unavailable)</button>
          )}
          
        </div>
      </div>
      
      <div>
        <img src={avatar} alt={name} />
      </div>
    </div>
  );
}

export default Card;

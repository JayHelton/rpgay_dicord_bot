function Rotation({ rotationState }) {
  if (!rotationState) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div
        className={
          rotationState.length
            ? 'rotation-start-div hidden'
            : 'rotation-start-div shown'
        }
      >
        Start by clicking a flight on the right to add it to the rotation!
      </div>
      <div className={rotationState.length ? 'shown' : 'hidden'}>
        {rotationState &&
          rotationState.map((rotation, index) => {
            return (
              <div className="rotation-flight-container" key={index}>
                <span className="font-weight-bold">Flight: {rotation.id}</span>
                <br />
                <div className="columns" style={{ marginTop: '20px' }}>
                  <div className="column col-3">
                    {rotation.origin}
                    <br />
                    {rotation.readable_departure}
                  </div>
                  <div className="column col-6" style={{ textAlign: 'center' }}>
                    <img src={Jets} />
                  </div>
                  <div className="column col-3" style={{ textAlign: 'right' }}>
                    {rotation.destination}
                    <br />
                    {rotation.readable_arrival}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

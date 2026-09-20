.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  margin-bottom: 22px;
  padding: 7px 12px 7px 10px;
  color: #17345f;
  background: linear-gradient(
    135deg,
    #f5f9ff 0%,
    #eef5ff 100%
  );
  border: 1px solid rgba(200, 155, 60, 0.35);
  border-radius: 999px;
  box-shadow: 0 8px 25px rgba(24, 65, 120, 0.07);
  font-size: 13px;
  font-weight: 800;
}

.hero-badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  color: #fff;
  background: linear-gradient(
    135deg,
    #1d4ed8,
    #173a78
  );
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.22);
}

.hero-badge-sparkle {
  color: #c89b3c;
}

.hero-copy h1 {
  margin: 0;
  color: #102a56;
  font-size: clamp(38px, 5vw, 62px);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -1.5px;
}

.hero-copy h1 strong {
  color: #c89b3c;
  font-weight: 900;
}

.hero-description {
  max-width: 570px;
  margin: 20px 0 0;
  color: #64748b;
  font-size: 17px;
  line-height: 2;
}

.hero-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 30px;
}

.hero-buttons .primary-button {
  min-height: 52px;
  padding: 0 22px;
  border-radius: 14px;
}

.hero-buttons .text-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #17345f;
  font-weight: 800;
}

.hero-trust {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  margin-top: 30px;
  padding: 10px 14px;
  background: #f8fbff;
  border: 1px solid #e5edf8;
  border-radius: 14px;
}

.hero-trust-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #fff;
  background: #1d4ed8;
  border-radius: 50%;
}

.hero-trust div:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero-trust strong {
  color: #17345f;
  font-size: 13px;
}

.hero-trust span {
  color: #7b8799;
  font-size: 11px;
}

.hero-photo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-photo img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 24px;
  box-shadow: 0 22px 55px rgba(16, 42, 86, 0.14);
}

@media (max-width: 800px) {
  .hero-copy {
    text-align: center;
  }

  .hero-badge {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-trust {
    margin-left: auto;
    margin-right: auto;
    text-align: right;
  }

  .hero-copy h1 {
    font-size: clamp(34px, 9vw, 48px);
    letter-spacing: -0.8px;
  }

  .hero-photo {
    margin-top: 30px;
  }
}
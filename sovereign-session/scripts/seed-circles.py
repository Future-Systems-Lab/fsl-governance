import psycopg2

conn = psycopg2.connect(host="localhost", dbname="encrypthealth", user="postgres")
conn.autocommit = True
cur = conn.cursor()

G = "0x739414BC271521Bea000A9aB2FbF79182124BCC3"

cur.execute("""INSERT INTO support_circle_sessions
    (title, theme, guide_wallet, scheduled_at, duration_minutes, level, description, max_participants, status)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
    ("Inner Child Integration Circle", "Shadow Work + Inner Child Healing", G,
     "2026-05-11 01:00:00+00", 60, "L3",
     "A sovereign group space for inner child healing and shadow integration. Facilitated by Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP.",
     12, "scheduled"))

cur.execute("""INSERT INTO support_circle_sessions
    (title, theme, guide_wallet, scheduled_at, duration_minutes, level, description, max_participants, status)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
    ("GABA Frequency Reset Circle", "Neurotransmitter Activation + Calm Restoration", G,
     "2026-05-18 01:00:00+00", 60, "L1",
     "GABA pathway activation for calm, safety, and nervous system regulation. Sound, breath, and intention as protocol. Facilitated by Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP.",
     12, "scheduled"))

cur.execute("""INSERT INTO support_circle_sessions
    (title, theme, guide_wallet, scheduled_at, duration_minutes, level, description, max_participants, status)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
    ("Sovereign Shadow Work Circle", "Jungian Shadow Integration + On-Chain Transmutation", G,
     "2026-05-25 01:00:00+00", 60, "L3",
     "We name what we have been avoiding. We transmute on-chain. Jungian shadow work facilitated by Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP, with AlchemistForge as the ritual anchor.",
     12, "scheduled"))

cur.execute("SELECT id, title, level, scheduled_at FROM support_circle_sessions ORDER BY scheduled_at")
for r in cur.fetchall():
    print(f"#{r[0]}: {r[1]} ({r[2]}) - {r[3]}")

cur.close()
conn.close()
print("3 sessions seeded")

require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const SiteSettings = require('../models/SiteSettings');
const User = require('../models/User');

const services = [
  {
    name: 'Range Hood Installation',
    slug: 'range-hood-installation',
    shortDescription: 'Professional installation of new range hoods for any kitchen layout.',
    fullDescription:
      'Our certified technicians install range hoods of all types and sizes, ensuring proper venting, secure mounting, and code-compliant ductwork so your kitchen stays clean, cool, and odor-free.',
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    order: 1,
  },
  {
    name: 'Range Hood Replacement',
    slug: 'range-hood-replacement',
    shortDescription: 'Swap out an old or damaged range hood with a modern, efficient unit.',
    fullDescription:
      'We remove your existing range hood and replace it with a new unit that fits your space and cooking needs, matching or upgrading ductwork as required.',
    icon: 'refresh-cw',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
    order: 2,
  },
  {
    name: 'Kitchen Exhaust Ventilation',
    slug: 'kitchen-exhaust-ventilation',
    shortDescription: 'Complete exhaust ventilation systems for residential and commercial kitchens.',
    fullDescription:
      'We design and install full kitchen exhaust ventilation systems that meet Alberta building code requirements, improving air quality and reducing grease buildup.',
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
    order: 3,
  },
  {
    name: 'Roof Exhaust Vent Installation',
    slug: 'roof-exhaust-vent-installation',
    shortDescription: 'Safe, weatherproof roof vent installation for kitchen exhaust systems.',
    fullDescription:
      'Our team installs roof exhaust vents with proper flashing and sealing to prevent leaks while ensuring efficient exhaust airflow year-round in Calgary weather.',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
    order: 4,
  },
  {
    name: 'Range Hood Ductwork',
    slug: 'range-hood-ductwork',
    shortDescription: 'Custom ductwork design and installation for optimal airflow.',
    fullDescription:
      'We design and fabricate custom ductwork runs that minimize bends and maximize airflow efficiency, whether venting through the roof, wall, or soffit.',
    icon: 'move',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    order: 5,
  },
  {
    name: 'Island Range Hood Installation',
    slug: 'island-range-hood-installation',
    shortDescription: 'Specialized installation for island-mounted range hoods.',
    fullDescription:
      'Island range hoods require precise structural support and ceiling ductwork. We handle the framing, electrical, and venting to deliver a clean, professional install.',
    icon: 'layout',
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800',
    order: 6,
  },
  {
    name: 'Under-Cabinet Range Hood Installation',
    slug: 'under-cabinet-range-hood-installation',
    shortDescription: 'Compact, efficient under-cabinet range hood installations.',
    fullDescription:
      'A space-saving option for smaller kitchens. We install under-cabinet range hoods with secure mounting and properly routed ductwork.',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
    order: 7,
  },
  {
    name: 'Chimney-Style Range Hood Installation',
    slug: 'chimney-style-range-hood-installation',
    shortDescription: 'Statement chimney-style hoods installed with precision.',
    fullDescription:
      'Chimney-style range hoods make a bold kitchen statement. We ensure secure wall or ceiling mounting and properly concealed, code-compliant ductwork.',
    icon: 'triangle',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    order: 8,
  },
  {
    name: 'Range Hood Motor Replacement & Repair',
    slug: 'range-hood-motor-replacement-repair',
    shortDescription: 'Fast diagnosis and repair of range hood motors and fans.',
    fullDescription:
      'Is your range hood loud, weak, or not turning on? We diagnose and repair or replace motors, fans, and electrical components to restore full performance.',
    icon: 'settings',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    order: 9,
  },
  {
    name: 'Attic Duct Insulation & Sealing',
    slug: 'attic-duct-insulation-sealing',
    shortDescription: 'Insulate and seal attic ductwork to prevent heat loss and condensation.',
    fullDescription:
      'Uninsulated attic ducts lose heat and can cause condensation issues. We insulate and seal exhaust ductwork running through attics for year-round efficiency.',
    icon: 'shield',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
    order: 10,
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Calgary, AB',
    rating: 5,
    review:
      'Venthood.ca did an outstanding job installing our island range hood. Clean work, on time, and the team explained everything clearly.',
    service: 'Island Range Hood Installation',
    approved: true,
  },
  {
    name: 'James T.',
    location: 'Airdrie, AB',
    rating: 5,
    review:
      'Our old range hood motor was replaced quickly and the kitchen is finally quiet again. Highly recommend for any ventilation work.',
    service: 'Range Hood Motor Replacement & Repair',
    approved: true,
  },
  {
    name: 'Priya K.',
    location: 'Cochrane, AB',
    rating: 5,
    review:
      'Professional from quote to completion. They handled the roof vent installation perfectly despite our steep roof pitch.',
    service: 'Roof Exhaust Vent Installation',
    approved: true,
  },
];

const faqs = [
  {
    question: 'Do you provide free quotes?',
    answer:
      'Yes, we provide a free, no-obligation quote for every project. Simply submit a request through our website or call us directly.',
    order: 1,
  },
  {
    question: 'What areas do you service?',
    answer: 'We proudly serve Calgary and the surrounding areas throughout Alberta.',
    order: 2,
  },
  {
    question: 'How long does a typical range hood installation take?',
    answer:
      'Most standard installations are completed in a single day. Complex ductwork or island installations may take longer, which we will confirm during your quote.',
    order: 3,
  },
  {
    question: 'Do you install both residential and commercial range hoods?',
    answer: 'Yes, we handle both residential kitchen installations and commercial kitchen ventilation systems.',
    order: 4,
  },
  {
    question: 'Is your work code-compliant?',
    answer:
      'All of our ventilation and ductwork installations are completed in accordance with Alberta building code requirements.',
    order: 5,
  },
  {
    question: 'Can you replace just the motor in my existing range hood?',
    answer:
      'Yes, we offer motor replacement and repair services if your existing range hood unit is otherwise in good condition.',
    order: 6,
  },
];

const projects = [
  {
    title: 'Island Range Hood Install - Calgary NW',
    description: 'Custom island range hood with ceiling-routed ductwork for an open-concept kitchen renovation.',
    location: 'Calgary, AB',
    category: 'Island Range Hood Installation',
    featuredImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200',
    images: ['https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200'],
    featured: true,
    visible: true,
  },
  {
    title: 'Chimney-Style Hood Upgrade',
    description: 'Replaced an outdated under-cabinet hood with a statement chimney-style hood and new wall venting.',
    location: 'Airdrie, AB',
    category: 'Chimney-Style Range Hood Installation',
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'],
    featured: true,
    visible: true,
  },
  {
    title: 'Roof Exhaust Vent Install',
    description: 'New roof exhaust vent with proper flashing and sealing for a two-storey home.',
    location: 'Cochrane, AB',
    category: 'Roof Exhaust Vent Installation',
    featuredImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200'],
    featured: false,
    visible: true,
  },
  {
    title: 'Under-Cabinet Hood Replacement',
    description: 'Swapped a noisy old under-cabinet hood for a quiet, efficient modern unit.',
    location: 'Calgary, AB',
    category: 'Under-Cabinet Range Hood Installation',
    featuredImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200'],
    featured: false,
    visible: true,
  },
  {
    title: 'Kitchen Exhaust Ductwork Redesign',
    description: 'Redesigned exhaust ductwork routing to reduce bends and improve airflow efficiency.',
    location: 'Okotoks, AB',
    category: 'Range Hood Ductwork',
    featuredImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'],
    featured: false,
    visible: true,
  },
  {
    title: 'Attic Duct Insulation Project',
    description: 'Insulated and sealed exhaust ductwork running through an unheated attic space.',
    location: 'Chestermere, AB',
    category: 'Attic Duct Insulation & Sealing',
    featuredImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
    images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200'],
    featured: false,
    visible: true,
  },
];

const seed = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Aborting seed.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB for seeding.');

  const existingServiceCount = await Service.countDocuments();
  if (existingServiceCount === 0) {
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services.`);
  } else {
    console.log('Services already seeded, skipping.');
  }

  const existingTestimonialCount = await Testimonial.countDocuments();
  if (existingTestimonialCount === 0) {
    await Testimonial.insertMany(testimonials);
    console.log(`Seeded ${testimonials.length} testimonials.`);
  } else {
    console.log('Testimonials already seeded, skipping.');
  }

  const existingFAQCount = await FAQ.countDocuments();
  if (existingFAQCount === 0) {
    await FAQ.insertMany(faqs);
    console.log(`Seeded ${faqs.length} FAQs.`);
  } else {
    console.log('FAQs already seeded, skipping.');
  }

  const settings = await SiteSettings.getSingleton();
  if (!settings.phones || settings.phones.length === 0) {
    settings.businessName = 'Venthood.ca';
    settings.phones = ['587-573-8822', '403-383-7013'];
    settings.email = 'info@venthood.ca';
    settings.whatsapp = '587-573-8822';
    settings.heroHeading = 'Calgary\'s Trusted Range Hood & Ventilation Experts';
    settings.heroDescription =
      'Professional range hood installation, replacement, and kitchen exhaust ventilation services across Calgary and Alberta.';
    settings.serviceAreas = ['Calgary', 'Airdrie', 'Cochrane', 'Okotoks', 'Chestermere', 'Surrounding Areas Alberta'];
    settings.footerText = `(c) ${new Date().getFullYear()} Venthood.ca - Calgary & Surrounding Areas Alberta`;
    await settings.save();
    console.log('Seeded site settings.');
  } else {
    console.log('Site settings already seeded, skipping.');
  }

  const existingProjectCount = await Project.countDocuments();
  if (existingProjectCount === 0) {
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects.`);
  } else {
    console.log('Projects already seeded, skipping.');
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@venthood.ca';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!';
    await User.create({
      name: 'Venthood Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Seeded admin user: ${adminEmail} / ${adminPassword} (change this password after first login).`);
  } else {
    console.log('Admin user already exists, skipping.');
  }

  console.log('Seeding complete.');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
